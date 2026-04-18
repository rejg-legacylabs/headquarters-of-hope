import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

// Create a client that routes to the Pathways Hub app
const hubClient = appParams.hubAppId ? createClient({
  appId: appParams.hubAppId,
  token: appParams.token,
  functionsVersion: appParams.functionsVersion,
  serverUrl: '',
  requiresAuth: false,
}) : null;

export async function invokeHubFunction(functionName, payload) {
  if (!hubClient) {
    throw new Error('Hub app ID not configured. Cannot reach Pathways Hub.');
  }
  return await hubClient.functions.invoke(functionName, payload);
}