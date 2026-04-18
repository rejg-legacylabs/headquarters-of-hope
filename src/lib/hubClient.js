import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

// Debug: Log initialization
console.log('🔧 Hub Client Initialization:');
console.log('  VITE_BASE44_HUB_APP_ID:', import.meta.env.VITE_BASE44_HUB_APP_ID);
console.log('  appParams.hubAppId:', appParams.hubAppId);

// Create a client that routes to the Pathways Hub app
const hubClient = appParams.hubAppId ? createClient({
  appId: appParams.hubAppId,
  token: appParams.token,
  functionsVersion: appParams.functionsVersion,
  serverUrl: '',
  requiresAuth: false,
}) : null;

console.log('  hubClient initialized:', !!hubClient);

export async function invokeHubFunction(functionName, payload) {
  if (!hubClient) {
    console.error('❌ Hub Client Error: hubClient is null');
    console.error('  appParams.hubAppId:', appParams.hubAppId);
    console.error('  import.meta.env.VITE_BASE44_HUB_APP_ID:', import.meta.env.VITE_BASE44_HUB_APP_ID);
    throw new Error('Hub app ID not configured. Cannot reach Pathways Hub.');
  }
  console.log(`📤 Invoking Hub function: ${functionName}`);
  console.log('  Targeting Hub App ID:', appParams.hubAppId);
  return await hubClient.functions.invoke(functionName, payload);
}