import React, { useState } from 'react';
import { 
  Video, 
  Mic, 
  Monitor, 
  MessageSquare, 
  Users, 
  Smile, 
  Hand, 
  Settings,
  X,
  PhoneOff,
  ScreenShare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function LiveSession() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSharing, setIsSharing] = useState(false);

  const participants = [
    { name: 'Dr. Sarah Chen (HOST)', role: 'Instructor', avatar: 'SC', active: true },
    { name: 'Marcus Vane', role: 'Mentor', avatar: 'MV' },
    { name: 'You', role: 'Student', avatar: 'ME', active: true },
    { name: 'Aiden Pearce', role: 'Student', avatar: 'AP' },
    { name: 'Clara Lille', role: 'Student', avatar: 'CL' },
  ];

  const reactions = ['🔥', '👍', '😮', '💯', '🛡️', '💻'];

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-6 overflow-hidden">
      {/* Video Content Area */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="relative flex-1 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl group">
          {/* Main Video Stream Simulation */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 to-transparent" />
             <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/20 mx-auto">
                   <Monitor className="w-10 h-10 text-cyan-400 animate-pulse" />
                </div>
                <div>
                   <h3 className="text-xl font-bold">Network Intrusion Lab: Live Session</h3>
                   <p className="text-sm text-zinc-500 font-mono italic">ENCRYPTED_STREAM_ACTIVE // 1080p_60FPS</p>
                </div>
             </div>
          </div>

          {/* Overlay UI */}
          <div className="absolute top-6 left-6 flex items-center gap-3">
             <div className="bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1.5 animate-pulse">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                LIVE
             </div>
             <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 flex items-center gap-2">
                <Users className="w-3 h-3 text-zinc-400" />
                <span className="text-xs font-mono text-zinc-200">1,204 watching</span>
             </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl">
             <button 
              onClick={() => setIsMuted(!isMuted)}
              className={cn(
                "p-3 rounded-xl transition-all",
                isMuted ? "bg-rose-500/20 text-rose-500 border border-rose-500/40" : "bg-zinc-800 text-white hover:bg-zinc-700"
              )}
             >
                {isMuted ? <Mic className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
             </button>
             <button 
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={cn(
                "p-3 rounded-xl transition-all",
                !isVideoOn ? "bg-rose-500/20 text-rose-500 border border-rose-500/40" : "bg-zinc-800 text-white hover:bg-zinc-700"
              )}
             >
                <Video className="w-5 h-5" />
             </button>
             <div className="h-8 w-[1px] bg-white/10 mx-2" />
             <button 
              onClick={() => setIsSharing(!isSharing)}
              className={cn(
                "p-3 rounded-xl transition-all",
                isSharing ? "bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]" : "bg-zinc-800 text-white hover:bg-zinc-700"
              )}
             >
                <ScreenShare className="w-5 h-5" />
             </button>
             <button className="p-3 bg-zinc-800 text-white hover:bg-zinc-700 rounded-xl transition-all">
                <Hand className="w-5 h-5" />
             </button>
             <button className="p-3 bg-zinc-800 text-white hover:bg-zinc-700 rounded-xl transition-all">
                <Settings className="w-5 h-5" />
             </button>
             <div className="h-8 w-[1px] bg-white/10 mx-2" />
             <button className="p-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition-all">
                <PhoneOff className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Reactions Bar */}
        <div className="flex justify-center gap-2 p-2 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl self-center">
           {reactions.map(emoji => (
             <button key={emoji} className="p-2 hover:bg-white/5 rounded-lg text-lg transition-transform hover:scale-125">
                {emoji}
             </button>
           ))}
        </div>
      </div>

      {/* Sidebar (Chat & Participants) */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="w-80 flex flex-col gap-4 h-full"
          >
            {/* Participants */}
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-4 flex flex-col max-h-[35%] overflow-hidden">
               <h3 className="text-xs font-mono text-zinc-500 mb-4 flex items-center justify-between uppercase tracking-widest">
                  Active Units 
                  <span className="text-cyan-400">05</span>
               </h3>
               <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {participants.map(p => (
                    <div key={p.name} className="flex items-center gap-3">
                       <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold border",
                        p.active ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                       )}>
                          {p.avatar}
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-zinc-200 truncate">{p.name}</p>
                          <p className="text-[10px] text-zinc-500">{p.role}</p>
                       </div>
                       {p.active && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                    </div>
                  ))}
               </div>
            </div>

            {/* Chat */}
            <div className="flex-1 bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl flex flex-col overflow-hidden min-h-0">
               <div className="p-4 border-bottom border-[#1a1a1a] flex items-center justify-between">
                  <h3 className="text-xs font-mono text-zinc-200 uppercase tracking-widest">Secure Chat</h3>
                  <button onClick={() => setIsChatOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                     <X className="w-4 h-4" />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {[
                    { user: 'Marcus Vane', text: 'Dr. Chen, should we initialize the firewall sequence now?' },
                    { user: 'Dr. Sarah Chen', text: 'Yes, but wait for the student handshake completion.' },
                    { user: 'You', text: 'Ready for deployment. Handshake verified.' },
                    { user: 'Aiden Pearce', text: 'Tracing packet headers now...' },
                  ].map((msg, i) => (
                    <div key={i} className="space-y-1">
                       <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">{msg.user}</p>
                       <p className="text-xs text-zinc-400 leading-relaxed rounded-lg bg-zinc-900/50 p-2">{msg.text}</p>
                    </div>
                  ))}
               </div>

               <div className="p-4 border-t border-[#1a1a1a]">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Transmit message..." 
                      className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg pl-3 pr-10 py-2.5 text-xs text-white focus:border-cyan-500/50 outline-none transition-all"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-zinc-900 rounded-md text-zinc-500 hover:text-cyan-400 transition-colors">
                       <Smile className="w-4 h-4" />
                    </button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
