import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
  type VerifiedRegistrationResponse,
  type VerifiedAuthenticationResponse
} from "@simplewebauthn/server";
import type { 
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
  AuthenticationResponseJSON
} from "@simplewebauthn/types";
import db from "./db";
import { nanoid } from "nanoid";

const RP_NAME = "Jefahnie Portal";
const RP_ID = "localhost"; // Change to your domain in production
const ORIGIN = "http://localhost:5173"; // Change to your URL in production

export async function generateRegistrationChallenge(userId: string, email: string) {
  const user = db.prepare("SELECT * FROM user WHERE id = ?").get(userId);
  if (!user) throw new Error("User not found");
  
  const userCredentials = db.prepare(
    "SELECT credential_id, transports FROM credential WHERE user_id = ?"
  ).all(userId) as Array<{ credential_id: string; transports: string }>;
  
  const excludeCredentials = userCredentials.map(cred => ({
    id: cred.credential_id,
    type: "public-key" as const,
    transports: cred.transports ? JSON.parse(cred.transports) : undefined
  }));
  
  const options = await generateRegistrationOptions({
    rpName: RP_NAME,
    rpID: RP_ID,
    userID: Buffer.from(userId),
    userName: email,
    userDisplayName: email.split("@")[0],
    attestationType: "none",
    excludeCredentials,
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred"
    }
  });
  
  // Store challenge
  const challengeId = nanoid();
  db.prepare(
    "INSERT INTO auth_challenge (id, user_id, challenge, type, expires_at) VALUES (?, ?, ?, ?, ?)"
  ).run(challengeId, userId, options.challenge, "register", Date.now() + 60000);
  
  return options;
}

export async function verifyRegistration(
  userId: string,
  response: RegistrationResponseJSON
): Promise<VerifiedRegistrationResponse> {
  // Get stored challenge
  const challenge = db.prepare(
    "SELECT challenge FROM auth_challenge WHERE user_id = ? AND type = ? AND expires_at > ? ORDER BY created_at DESC LIMIT 1"
  ).get(userId, "register", Date.now()) as { challenge: string } | undefined;
  
  if (!challenge) throw new Error("Challenge not found or expired");
  
  const verification = await verifyRegistrationResponse({
    response,
    expectedChallenge: challenge.challenge,
    expectedOrigin: ORIGIN,
    expectedRPID: RP_ID
  });
  
  if (verification.verified && verification.registrationInfo) {
    const { credentialPublicKey, credentialID, counter } = verification.registrationInfo;
    
    // Store credential
    db.prepare(
      "INSERT INTO credential (id, user_id, public_key, credential_id, counter, transports) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(
      nanoid(),
      userId,
      Buffer.from(credentialPublicKey).toString("base64"),
      Buffer.from(credentialID).toString("base64"),
      counter,
      JSON.stringify(response.response.transports || [])
    );
    
    // Clean up challenge
    db.prepare("DELETE FROM auth_challenge WHERE user_id = ? AND type = ?").run(userId, "register");
  }
  
  return verification;
}

export async function generateAuthenticationChallenge(email: string) {
  const user = db.prepare("SELECT id FROM user WHERE email = ?").get(email) as { id: string } | undefined;
  if (!user) throw new Error("User not found");
  
  const userCredentials = db.prepare(
    "SELECT credential_id, transports FROM credential WHERE user_id = ?"
  ).all(user.id) as Array<{ credential_id: string; transports: string }>;
  
  if (userCredentials.length === 0) {
    throw new Error("No credentials found");
  }
  
  const allowCredentials = userCredentials.map(cred => ({
    id: Buffer.from(cred.credential_id, "base64"),
    type: "public-key" as const,
    transports: cred.transports ? JSON.parse(cred.transports) : undefined
  }));
  
  const options = await generateAuthenticationOptions({
    rpID: RP_ID,
    allowCredentials,
    userVerification: "preferred"
  });
  
  // Store challenge
  const challengeId = nanoid();
  db.prepare(
    "INSERT INTO auth_challenge (id, email, challenge, type, expires_at) VALUES (?, ?, ?, ?, ?)"
  ).run(challengeId, email, options.challenge, "login", Date.now() + 60000);
  
  return options;
}

export async function verifyAuthentication(
  email: string,
  response: AuthenticationResponseJSON
): Promise<{ verified: boolean; userId?: string }> {
  const user = db.prepare("SELECT id FROM user WHERE email = ?").get(email) as { id: string } | undefined;
  if (!user) throw new Error("User not found");
  
  // Get stored challenge
  const challenge = db.prepare(
    "SELECT challenge FROM auth_challenge WHERE email = ? AND type = ? AND expires_at > ? ORDER BY created_at DESC LIMIT 1"
  ).get(email, "login", Date.now()) as { challenge: string } | undefined;
  
  if (!challenge) throw new Error("Challenge not found or expired");
  
  // Get credential
  const credential = db.prepare(
    "SELECT public_key, counter FROM credential WHERE credential_id = ? AND user_id = ?"
  ).get(response.id, user.id) as { public_key: string; counter: number } | undefined;
  
  if (!credential) throw new Error("Credential not found");
  
  const verification = await verifyAuthenticationResponse({
    response,
    expectedChallenge: challenge.challenge,
    expectedOrigin: ORIGIN,
    expectedRPID: RP_ID,
    authenticator: {
      credentialPublicKey: Buffer.from(credential.public_key, "base64"),
      credentialID: Buffer.from(response.id, "base64"),
      counter: credential.counter
    }
  });
  
  if (verification.verified) {
    // Update counter
    db.prepare(
      "UPDATE credential SET counter = ? WHERE credential_id = ?"
    ).run(verification.authenticationInfo.newCounter, response.id);
    
    // Clean up challenge
    db.prepare("DELETE FROM auth_challenge WHERE email = ? AND type = ?").run(email, "login");
    
    return { verified: true, userId: user.id };
  }
  
  return { verified: false };
}