import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  Check,
} from 'lucide-react';
import { marked } from 'marked';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AIAssistantModalProps {
  onNavigate: (view: string, slug?: string) => void;
  onOpenDonateModal: (projectId?: string) => void;
  whatsappNumber?: string;
}

const INITIAL_WELCOME = `Hello! You are warmly welcome to **BK Construction and Humanity For Habitat NGO**.

We help communities in Ghana by providing clean drinking water through boreholes, training young people in construction and building skills, and supporting young girls with school scholarships.

Would you like to ask any questions today?`;

const STARTER_QUESTIONS = [
  '💧 How can I sponsor a water borehole?',
  '☀️ How does the solar water system work?',
  '👷 Tell me about youth job training',
  '🎓 How do school scholarships for girls work?',
  '💬 Chat directly with the team on WhatsApp',
];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  onNavigate,
  onOpenDonateModal,
  whatsappNumber = '233241234567',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [askedQuestionFlow, setAskedQuestionFlow] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: INITIAL_WELCOME,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const cleanWhatsappNumber = whatsappNumber.replace(/[^\d]/g, '') || '233241234567';

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, askedQuestionFlow]);

  const handleAnswerInitialPrompt = (wantsToAsk: boolean) => {
    setAskedQuestionFlow(true);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (wantsToAsk) {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        text: 'Yes, I have a question',
        timestamp: nowTime,
      };
      const botMsg: Message = {
        id: `bot-${Date.now() + 1}`,
        role: 'assistant',
        text: `Awesome! Please feel free to ask anything about our clean water boreholes, job training, or how you can support our work.\n\nYou can type your question in the box below or choose from one of the topics below.`,
        timestamp: nowTime,
      };
      setMessages((prev) => [...prev, userMsg, botMsg]);
    } else {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        text: 'No, thank you',
        timestamp: nowTime,
      };
      const botMsg: Message = {
        id: `bot-${Date.now() + 1}`,
        role: 'assistant',
        text: `No problem at all! Feel free to look around our website.\n\nIf you ever need help or want to speak directly with our team, you can always reach us on WhatsApp:\n\n👉 **[Chat with our team on WhatsApp](https://wa.me/${cleanWhatsappNumber})**`,
        timestamp: nowTime,
      };
      setMessages((prev) => [...prev, userMsg, botMsg]);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    if (!askedQuestionFlow) {
      setAskedQuestionFlow(true);
    }

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history = messages.slice(1).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.reply || "We are here to help you learn about our clean water, training, and school projects in Ghana. Please ask any question!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback message
      const fallbackMsg: Message = {
        id: `assistant-err-${Date.now()}`,
        role: 'assistant',
        text: `We are dedicated to providing clean water and helping communities across Ghana.\n\nFor immediate answers, feel free to chat with our field team directly:\n\n👉 **[Chat with our team on WhatsApp](https://wa.me/${cleanWhatsappNumber})**\n👉 **[Sponsor a Borehole / Donate](#donate)**`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAskedQuestionFlow(false);
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: INITIAL_WELCOME,
        timestamp: 'Just now',
      },
    ]);
  };

  // Intercept link clicks inside the rendered Markdown
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Check internal in-app hashes
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetHash = href.substring(1);

      if (targetHash.startsWith('blog/')) {
        const slug = targetHash.replace('blog/', '');
        onNavigate('blog', slug);
        setIsOpen(false);
      } else if (targetHash === 'donate') {
        onOpenDonateModal();
        setIsOpen(false);
      } else if (targetHash === 'volunteer') {
        onNavigate('volunteer');
        setIsOpen(false);
      } else if (targetHash === 'projects') {
        onNavigate('projects');
        setIsOpen(false);
      } else if (targetHash === 'contact') {
        onNavigate('contact');
        setIsOpen(false);
      } else if (targetHash === 'about') {
        onNavigate('about');
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {/* Floating Launcher Button (Bottom-Left Corner, Small Circle Only) */}
      <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Chat"
          title="Chat"
          className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-[#082238] hover:bg-[#0D3150] text-white rounded-full shadow-lg hover:shadow-xl border border-emerald-400/40 transition-all duration-300 transform active:scale-90 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400/30 relative"
        >
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#082238]" />
        </button>
      </div>

      {/* Slide-out / Floating Chat Window (Opens above Bottom-Left button) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat"
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in-up"
        >
          {/* Header */}
          <div className="bg-[#082238] text-white px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold font-display text-white">Chat</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Humanity For Habitat · Here to Help</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Restart chat"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div
            onClick={handleContentClick}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 text-sm leading-relaxed"
          >
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div key={msg.id} className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl shadow-xs text-sm ${
                        isUser
                          ? 'bg-[#082238] text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        <div
                          className="prose prose-sm max-w-none text-slate-800 prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-emerald-700 hover:prose-a:text-emerald-800 prose-a:font-semibold prose-a:underline"
                          dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) as string }}
                        />
                      )}
                    </div>

                    <span className="text-[10px] text-slate-400 px-1 block">{msg.timestamp}</span>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Initial Yes/No Choice Buttons right under the welcome greeting */}
            {messages.length === 1 && !askedQuestionFlow && (
              <div className="flex flex-wrap items-center gap-2 pt-1 pl-9">
                <button
                  onClick={() => handleAnswerInitialPrompt(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Yes, I have a question</span>
                </button>
                <button
                  onClick={() => handleAnswerInitialPrompt(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  <span>No, thank you</span>
                </button>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-bl-xs shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips (Shown when user wants to ask questions) */}
          {askedQuestionFlow && !isLoading && (
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-full px-3 py-1.5 whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question here..."
              disabled={isLoading}
              className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white shadow-md transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
