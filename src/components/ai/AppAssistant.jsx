import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CRISIS_KEYWORDS = ['crisis', 'suicide', 'suicidal', 'unsafe', 'danger', 'abuse', 'harm', 'dying', 'emergency'];

const CRISIS_RESPONSE = `🚨 **Your safety is our priority.**

If you're in immediate danger or having thoughts of self-harm, please reach out for help **right now**:

📞 **National Crisis Hotline:** Call or text **988** (available 24/7)
📞 **Austin Crisis Line:** **512-472-4357**

These trained counselors are available immediately to help. Please call before anything else. You're not alone, and help is available.

We're here to support you, but these crisis specialists can provide the immediate care you need.`;

const SUGGESTED_CHIPS = ['How to apply?', 'Tell me about your programs', 'Get help now'];

const SYSTEM_PROMPT = `You are a warm, compassionate community intake assistant for Headquarters of Hope, a nonprofit dedicated to helping people transition out of homelessness through job training, housing support, and life skills development.

Your role is to:
1. Welcome visitors warmly and help them understand HOH programs
2. Guide people through the application process if they want help
3. Answer questions about transitional housing, workforce development, and other services
4. Listen with empathy - many people contacting you may be reaching out for help for the first time
5. Collect contact information when appropriate so we can follow up

Key Information to Share:
- HOH offers three main programs: Job Readiness Training, Housing Support, and Transportation Assistance
- We serve individuals facing housing insecurity and unemployment
- Our approach combines practical skills training with compassionate support
- Anyone can apply - no income requirements
- We work with partners across the community

Guidelines:
- Always be warm, human, and compassionate - never clinical or robotic
- If someone asks how to get help, explain the application process is simple: just fill out our Get Help form
- Offer to help them get connected to specific resources
- If someone seems to be in crisis, interrupt everything and provide crisis resources immediately
- Collect contact info only when they express interest in applying or getting help
- For specific program details they don't know, suggest they visit the Programs page

Remember: This may be someone's first reach out for help. Treat every interaction with dignity and care.`;

export default function AppAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Hi there! I'm the Headquarters of Hope assistant. I'm here to help you understand our programs, answer questions about getting support, and guide you through the application process.\n\nWhat can I help you with today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectCrisis = (text) => {
    const lowerText = text.toLowerCase();
    return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword));
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = messageText.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      // Check for crisis immediately
      if (detectCrisis(userMessage)) {
        setMessages(prev => [...prev, { role: 'assistant', content: CRISIS_RESPONSE }]);
        setLoading(false);
        return;
      }

      // Call backend function to get AI response
      const response = await base44.functions.invoke('aiAssistant', {
        message: userMessage,
        systemPrompt: SYSTEM_PROMPT,
      });

      const assistantMessage = response.data?.response || "I'm having trouble responding right now. Please try again or call us at 512-XXX-XXXX.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);

      // If user provided contact info, create lead
      if (response.data?.extractedInfo) {
        console.log('📋 Contact info extracted:', response.data.extractedInfo);
      }
    } catch (error) {
      console.error('❌ Assistant error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, I'm having trouble responding. Please try again or visit our contact page.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (chip) => {
    handleSendMessage(chip);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        style={{
          backgroundColor: '#F59E0B',
          color: 'white',
        }}
        aria-label="Open assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[90vw] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: '600px', backgroundColor: '#1a1a2e' }}>
          
          {/* Header */}
          <div
            className="px-6 py-4 text-white flex items-center gap-3"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <MessageCircle size={20} />
            <div className="text-left">
              <div className="font-semibold">Headquarters of Hope</div>
              <div className="text-xs opacity-90">We're here to help</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                  style={msg.role === 'assistant' && msg.content.includes('🚨') ? {
                    backgroundColor: '#7f1d1d',
                    borderLeft: '3px solid #F59E0B'
                  } : {}}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 px-4 py-2 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Chips (show only on initial state) */}
          {messages.length === 1 && !loading && (
            <div className="px-4 py-3 border-t border-gray-600 space-y-2">
              {SUGGESTED_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(chip)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-white transition-colors"
                  style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.2)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.1)'}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-600 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 bg-gray-700 text-white border-gray-600 placeholder:text-gray-400"
            />
            <Button
              onClick={() => handleSendMessage(input)}
              disabled={!input.trim() || loading}
              size="icon"
              style={{ backgroundColor: '#F59E0B' }}
              className="hover:opacity-90"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}