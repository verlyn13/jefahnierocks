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
import { getDb } from "./db";
import { nanoid } from "nanoid";

import { dev } from "$app/environment";

const RP_NAME = "Jefahnie Portal";
const RP_ID = dev ? "localhost" : "jefahnie-portal.vercel.app";
const ORIGIN = dev ? "http://localhost:5173" : "https://jefahnie-portal.vercel.app";

export async function generateRegistrationChallenge(userId: string, email: string) {
  const userResult = await getDb().execute({
    sql: "SELECT * FROM user WHERE id = ?",
    args: [userId]
  });
  
  if (userResult.rows.length === 0) throw new Error("User not found");
  
  const credentialsResult = await getDb().execute({
    sql: "SELECT credential_id, transports FROM credential WHERE user_id = ?",
    args: [userId]
  });
  
  const excludeCredentials = credentialsResult.rows.map(cred => ({
    id: cred.credential_id as string,
    type: "public-key" as const,
    transports: cred.transports ? JSON.parse(cred.transports as string) : undefined
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
  await getDb().execute({
    sql: "INSERT INTO auth_challenge (id, user_id, challenge, type, expires_at) VALUES (?, ?, ?, ?, ?)",
    args: [challengeId, userId, options.challenge, "register", Date.now() + 60000]
  });
  
  return options;
}

export async function verifyRegistration(
  userId: string,
  response: RegistrationResponseJSON
): Promise<VerifiedRegistrationResponse> {
  // Get stored challenge
  const challengeResult = await getDb().execute({
    sql: "SELECT challenge FROM auth_challenge WHERE user_id = ? AND type = ? AND expires_at > ? ORDER BY created_at DESC LIMIT 1",
    args: [userId, "register", Date.now()]
  });
  
  if (challengeResult.rows.length === 0) throw new Error("Challenge not found or expired");
  
  const challenge = challengeResult.rows[0].challenge as string;
  
  const verification = await verifyRegistrationResponse({
    response,
    expectedChallenge: challenge,
    expectedOrigin: ORIGIN,
    expectedRPID: RP_ID
  });
  
  if (verification.verified && verification.registrationInfo) {
    const { credentialPublicKey, credentialID, counter } = verification.registrationInfo;
    
    // Store credential
    await getDb().execute({
      sql: "INSERT INTO credential (id, user_id, public_key, credential_id, counter, transports) VALUES (?, ?, ?, ?, ?, ?)",
      args: [
        nanoid(),
        userId,
        Buffer.from(credentialPublicKey).toString("base64"),
        Buffer.from(credentialID).toString("base64"),
        counter,
        JSON.stringify(response.response.transports || [])
      ]
    });
    
    // Clean up challenge
    await getDb().execute({
      sql: "DELETE FROM auth_challenge WHERE user_id = ? AND type = ?",
      args: [userId, "register"]
    });
  }
  
  return verification;
}

export async function generateAuthenticationChallenge(email: string) {
  const userResult = await getDb().execute({
    sql: "SELECT id FROM user WHERE email = ?",
    args: [email]
  });
  
  if (userResult.rows.length === 0) throw new Error("User not found");
  
  const userId = userResult.rows[0].id as string;
  
  const credentialsResult = await getDb().execute({
    sql: "SELECT credential_id, transports FROM credential WHERE user_id = ?",
    args: [userId]
  });
  
  if (credentialsResult.rows.length === 0) {
    throw new Error("No credentials found");
  }
  
  const allowCredentials = credentialsResult.rows.map(cred => ({
    id: Buffer.from(cred.credential_id as string, "base64"),
    type: "public-key" as const,
    transports: cred.transports ? JSON.parse(cred.transports as string) : undefined
  }));
  
  const options = await generateAuthenticationOptions({
    rpID: RP_ID,
    allowCredentials,
    userVerification: "preferred"
  });
  
  // Store challenge
  const challengeId = nanoid();
  await getDb().execute({
    sql: "INSERT INTO auth_challenge (id, email, challenge, type, expires_at) VALUES (?, ?, ?, ?, ?)",
    args: [challengeId, email, options.challenge, "login", Date.now() + 60000]
  });
  
  return options;
}

export async function verifyAuthentication(
  email: string,
  response: AuthenticationResponseJSON
): Promise<{ verified: boolean; userId?: string }> {
  const userResult = await getDb().execute({
    sql: "SELECT id FROM user WHERE email = ?",
    args: [email]
  });
  
  if (userResult.rows.length === 0) throw new Error("User not found");
  
  const userId = userResult.rows[0].id as string;
  
  // Get stored challenge
  const challengeResult = await getDb().execute({
    sql: "SELECT challenge FROM auth_challenge WHERE email = ? AND type = ? AND expires_at > ? ORDER BY created_at DESC LIMIT 1",
    args: [email, "login", Date.now()]
  });
  
  if (challengeResult.rows.length === 0) throw new Error("Challenge not found or expired");
  
  const challenge = challengeResult.rows[0].challenge as string;
  
  // Get credential
  const credentialResult = await getDb().execute({
    sql: "SELECT public_key, counter FROM credential WHERE credential_id = ? AND user_id = ?",
    args: [response.id, userId]
  });
  
  if (credentialResult.rows.length === 0) throw new Error("Credential not found");
  
  const credential = credentialResult.rows[0];
  
  const verification = await verifyAuthenticationResponse({
    response,
    expectedChallenge: challenge,
    expectedOrigin: ORIGIN,
    expectedRPID: RP_ID,
    authenticator: {
      credentialPublicKey: Buffer.from(credential.public_key as string, "base64"),
      credentialID: Buffer.from(response.id, "base64"),
      counter: credential.counter as number
    }
  });
  
  if (verification.verified) {
    // Update counter
    await getDb().execute({
      sql: "UPDATE credential SET counter = ? WHERE credential_id = ?",
      args: [verification.authenticationInfo.newCounter, response.id]
    });
    
    // Clean up challenge
    await getDb().execute({
      sql: "DELETE FROM auth_challenge WHERE email = ? AND type = ?",
      args: [email, "login"]
    });
    
    return { verified: true, userId };
  }
  
  return { verified: false };
}