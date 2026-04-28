import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import AIAnalyst from './pages/AIAnalyst';
import LiveSession from './pages/LiveSession';
import Assignments from './pages/Assignments';
import Auth from './pages/Auth';
import { Shield } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-8">
        <div className="bg-cyan-500/10 p-4 rounded-3xl border border-cyan-500/20 mb-6 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          <Shield className="w-12 h-12 text-cyan-400 animate-pulse" />
        </div>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] italic animate-pulse">Initializing Security Protocols...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {user ? (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex">
          <Navbar />
          <main className="flex-1 ml-64 min-h-screen flex flex-col">
            {/* Top Header from Design */}
            <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur px-8 flex items-center justify-between sticky top-0 z-40">
              <div className="flex items-center gap-4 text-xs font-mono uppercase italic tracking-wider">
                <span className="text-slate-500 underline underline-offset-4 decoration-emerald-500/30">SESSION:</span>
                <span className="text-emerald-400 font-bold">SEC_EST_2024_Q4</span>
                <span className="text-slate-500 ml-4">STATUS:</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md shadow-[0_0_15px_rgba(16,185,129,0.1)]">SECURE_LINK</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-500 uppercase tracking-tighter">System Fidelity</span>
                  <div className="flex gap-0.5 mt-0.5">
                    <div className="w-3 h-1.5 bg-emerald-500 rounded-sm"></div>
                    <div className="w-3 h-1.5 bg-emerald-500 rounded-sm"></div>
                    <div className="w-3 h-1.5 bg-emerald-500 rounded-sm"></div>
                    <div className="w-3 h-1.5 bg-slate-700/50 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </header>

            <div className="flex-1 p-8 max-w-7xl mx-auto w-full relative">
               <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/ai-analyst" element={<AIAnalyst />} />
                <Route path="/live" element={<LiveSession />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            
            {/* Footer Notifications Bar */}
            <footer className="mx-8 mb-8 h-12 flex items-center justify-between px-6 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="flex gap-6 items-center text-[10px] italic">
                <div className="flex items-center gap-2 text-slate-400 font-bold uppercase">
                  <span className="text-emerald-500 animate-pulse">◆</span> PHASE 12 SECURITY AUDIT IN 2 DAYS
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-bold uppercase border-l border-slate-800 pl-6">
                  <span className="text-amber-500">⚠</span> NEW ASSIGNMENT FEEDBACK QUEUED
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                LATENCY: 14ms | TLS 1.3 | AES-256-GCM
              </div>
            </footer>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
