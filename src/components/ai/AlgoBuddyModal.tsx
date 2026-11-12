import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Lightbulb,
  BookOpen,
  Terminal,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';
import { AlgorithmId } from '../../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: string;
  note?: string;
}

interface AlgoBuddyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAlgorithmId?: AlgorithmId;
}

export const AlgoBuddyModal: React.FC<AlgoBuddyModalProps> = ({
  isOpen,
  onClose,
  currentAlgorithmId = 'bubble',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am **AlgoBuddy AI**, your dedicated Data Structures & Algorithms learning mentor for MSBTE Diploma & Engineering exams.\n\nI can explain sorting mechanisms, analyze time complexities, break down C/C++/Java/Python code, or prepare you for viva voce questions!\n\nWhat would you like to explore today?`,
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: {
            algorithmName: currentAlgorithmId,
          },
          conversationHistory: messages.slice(-4),
        }),
      });

      const data = await response.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || "I'm here to help you master sorting algorithms. Could you ask again?",
        source: data.source,
        note: data.note,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: `### Quick Educational Summary for ${currentAlgorithmId.toUpperCase()} Sort:\n- **Time Complexity:** Best O(n) on pre-sorted array (with swapped check), Average O(n²), Worst O(n²).\n- **Space:** O(1) in-place auxiliary memory.\n- **Stability:** Stable because adjacent swaps only occur when left element strictly exceeds right element.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const promptChips = [
    'Explain Bubble Sort in simple words',
    'Why is Merge Sort O(n log n)?',
    'Compare Quick Sort vs Merge Sort for exams',
    'Which algorithm is best for nearly sorted data?',
    'Top 3 viva questions on Insertion Sort',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel rounded-2xl max-w-2xl w-full h-[85vh] flex flex-col border border-slate-700 shadow-2xl overflow-hidden bg-slate-950/95">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans']">
                  AlgoBuddy AI Assistant
                </h3>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                  DSA Mentor
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Powered by Gemini 3.8 Flash</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start space-x-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 space-y-2 leading-relaxed shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{m.text}</div>

                {m.note && (
                  <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800">
                    {m.note}
                  </p>
                )}

                {m.sender === 'assistant' && (
                  <div className="flex items-center justify-end pt-1 border-t border-slate-800/60 text-[10px] text-slate-400">
                    <button
                      onClick={() => handleCopyMessage(m.id, m.text)}
                      className="hover:text-cyan-300 flex items-center space-x-1"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Answer</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400 text-xs flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>AlgoBuddy is reasoning...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800 overflow-x-auto flex items-center space-x-2 scrollbar-none">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] whitespace-nowrap transition border border-slate-700/80 shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask AlgoBuddy any question about sorting algorithms, viva, or code..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-40 text-white font-semibold text-xs transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
