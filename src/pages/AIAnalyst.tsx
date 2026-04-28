import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Send, 
  Bot, 
  Fingerprint, 
  ShieldCheck, 
  AlertTriangle,
  Cpu,
  RefreshCcw,
  Code
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { askAnalyst } from '@/src/services/gemini';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAnalyst() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "System online. I am your specialized Security Analyst. Upload code for vulnerability scanning or ask me about any cybersecurity concept. How can I assist your training today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await askAnalyst(input);
    
    const assistMsg: Message = {
      role: 'assistant',
      content: response || "Analyst timeout. Retrying connection...",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistMsg]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col gap-6">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase italic tracking-widest">AI SECURITY ANALYST</h2>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-widest italic font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              NEURAL CORE v4.2.1 ACTIVE
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setMessages([messages[0]])} className="p-2 hover:bg-slate-800 border border-transparent hover:border-slate-700 rounded-lg text-slate-400 transition-all font-mono text-[10px] flex items-center gap-2 uppercase font-bold">
            <RefreshCcw className="w-3.5 h-3.5" />
            Wipe Cache
          </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
        {/* Subtle Mono Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[background-size:20px_20px] pointer-events-none" />

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800 relative z-10"
        >
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "flex gap-4 max-w-[90%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-inner",
                  msg.role === 'assistant' 
                    ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" 
                    : "bg-slate-800 border-slate-700 text-slate-400"
                )}>
                  {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <Fingerprint className="w-5 h-5" />}
                </div>
                <div className="space-y-1">
                   <span className={cn(
                     "text-[9px] font-bold font-mono uppercase tracking-[0.2em] block px-1",
                     msg.role === 'assistant' ? "text-cyan-500" : "text-slate-500 text-right"
                   )}>
                     {msg.role === 'assistant' ? 'SEC_AI_ANALYSIS' : 'OPERATOR_QUERY'}
                   </span>
                   <div className={cn(
                    "p-4 rounded-xl text-sm leading-relaxed border shadow-xl backdrop-blur-sm",
                    msg.role === 'assistant' 
                      ? "bg-slate-900/80 border-slate-800 text-slate-300" 
                      : "bg-slate-800/80 border-slate-700 text-slate-200"
                  )}>
                     <div className="markdown-body prose prose-invert prose-emerald prose-sm max-w-none">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-600 block mt-1 uppercase tracking-tighter italic">
                    TIMESTAMP: {msg.timestamp.toLocaleTimeString()} // LOG_ID: 0x{Math.floor(Math.random()*1000).toString(16)}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex gap-4 mr-auto max-w-[85%]">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border bg-cyan-500/10 border-cyan-500/20 text-cyan-400">
                <RefreshCcw className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex gap-2 items-center">
                <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>

        {/* Input area from High Density Design */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 z-20">
          <div className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Analyze code or ask a doubt..."
              className="w-full bg-slate-950 border border-slate-800 group-hover:border-cyan-500/40 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 rounded-xl pl-12 pr-12 py-3.5 text-xs text-white placeholder-slate-600 transition-all outline-none font-mono italic"
            />
            <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
            <button
              onClick={handleSend}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-600 hover:text-cyan-400 transition-colors disabled:opacity-50 hover:scale-110 active:scale-95"
              disabled={!input.trim() || isLoading}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-3 flex justify-between items-center px-1">
             <div className="flex gap-4">
                <span className="text-[9px] font-mono text-slate-500 hover:text-slate-300 cursor-pointer transition-colors uppercase font-bold tracking-widest">• Attach Lab Report</span>
                <span className="text-[9px] font-mono text-slate-500 hover:text-slate-300 cursor-pointer transition-colors uppercase font-bold tracking-widest">• Vulnerability Scan</span>
             </div>
             <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest italic">SEC_AES_256_ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
