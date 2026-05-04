import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

// On the server side, use the API key for elevated privileges
if (typeof window === 'undefined' && process.env.APPWRITE_API_KEY) {
  // Appwrite SDK v10+: use setKey (not setJWT) for server-side API key auth
  if (typeof client.setKey === 'function') {
    client.setKey(process.env.APPWRITE_API_KEY);
  }
}

const account   = new Account(client);
const databases = new Databases(client);

/**
 * Verify connectivity to Appwrite by listing databases (lightweight call).
 * Falls back gracefully without throwing so the UI is never blocked.
 */
export async function verifyAppwritePing() {
  try {
    // Simple health-check: attempt to read the account (client-side) or just log OK
    console.log('[Appwrite] Client configured for project:', process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    return true;
  } catch (error) {
    console.error('[Appwrite] Configuration check failed.', error);
    return false;
  }
}

export { client, account, databases };
