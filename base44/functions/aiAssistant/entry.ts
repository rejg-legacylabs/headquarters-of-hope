import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { message, systemPrompt } = body;

    if (!message || !systemPrompt) {
      return Response.json(
        { error: 'Message and systemPrompt required' },
        { status: 400 }
      );
    }

    console.log('🤖 AI Assistant Processing:', {
      message: message.substring(0, 50),
      timestamp: new Date().toISOString(),
    });

    // Use Base44's built-in LLM integration
    const response = await base44.integrations.Core.InvokeLLM({
      prompt: message,
      model: 'gemini_3_flash', // Fast, responsive model for chat
    });

    // Add system context to response if needed
    const systemContextPrompt = `${systemPrompt}\n\nUser message: ${message}`;
    
    const contextualResponse = await base44.integrations.Core.InvokeLLM({
      prompt: systemContextPrompt,
      model: 'gemini_3_flash',
    });

    console.log('✅ AI Response generated');

    // Extract potential contact info from message (simple pattern matching)
    const extractedInfo = extractContactInfo(message);

    return Response.json({
      response: contextualResponse,
      extractedInfo: extractedInfo.length > 0 ? extractedInfo : null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ AI Assistant error:', error);
    return Response.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
});

function extractContactInfo(message) {
  const extracted = {};

  // Email pattern
  const emailMatch = message.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) extracted.email = emailMatch[0];

  // Phone pattern (US format)
  const phoneMatch = message.match(/\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/);
  if (phoneMatch) extracted.phone = phoneMatch[0];

  // Name pattern (simple - looks for capitalized words)
  const nameMatch = message.match(/(?:my name is|i'm|i am)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (nameMatch) extracted.name = nameMatch[1];

  return Object.keys(extracted).length > 0 ? [extracted] : [];
}