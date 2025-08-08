// Email whitelist for registration
// Only these emails are allowed to register accounts

const ALLOWED_EMAILS = [
  'jeffreyverlynjohnson@gmail.com',
  'ahnielitecky@gmail.com'
];

export function isEmailAllowed(email: string): boolean {
  return ALLOWED_EMAILS.includes(email.toLowerCase().trim());
}

export function getWhitelistError(): string {
  return "Registration is restricted. Please contact an administrator if you believe you should have access.";
}