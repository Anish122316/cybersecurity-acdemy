import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Mail, 
  ChevronRight, 
  Fingerprint,
  User as UserIcon,
  Zap,
  Globe,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { auth, db, signInWithGoogle } from '@/src/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/src/lib/firestoreUtils';

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: formData.name });

        // Create user profile in Firestore
        const userPath = `users/${user.uid}`;
        try {
          await setDoc(doc(db, 'users', user.uid), {
            userId: user.uid,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            createdAt: serverTimestamp()
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, userPath);
        }
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Note: On first login with Google, you might want to check if a user doc exists and create one if not.
      // For this MVP, we focus on the email/password flow with role selection.
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center p-6 z-[100] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
          >
            <Shield className="w-10 h-10 text-emerald-400" />
          </motion.div>
          <h1 className="text-xl font-bold text-white tracking-[0.3em] uppercase italic">
            SECURE ENTRY CONSOLE
          </h1>
          <p className="text-slate-500 text-[10px] font-mono mt-4 uppercase tracking-[0.2em] italic font-bold">Accessing CyberShield Core Services...</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
        >
          {/* Form Overlay Glow */}
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-emerald-500/[0.03] group-hover:bg-emerald-500/[0.05] transition-colors blur-3xl rotate-45 pointer-events-none" />

          <div className="relative">
            <div className="flex gap-2 mb-8 bg-slate-950/50 p-1 rounded-xl border border-slate-800">
               <button 
                onClick={() => { setMode('login'); setError(null); }}
                className={cn(
                  "flex-1 py-2 text-[10px] font-bold rounded-lg transition-all tracking-[0.1em]",
                  mode === 'login' ? "bg-slate-800 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                )}
               >
                  IDENTIFY
               </button>
               <button 
                onClick={() => { setMode('signup'); setError(null); }}
                className={cn(
                  "flex-1 py-2 text-[10px] font-bold rounded-lg transition-all tracking-[0.1em]",
                  mode === 'signup' ? "bg-slate-800 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                )}
               >
                  INITIALIZE
               </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-[10px] font-mono font-bold uppercase italic tracking-widest">
                ERROR :: {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
               <AnimatePresence mode="wait">
                 {mode === 'signup' && (
                    <motion.div 
                      key="signup-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1 italic">Operator Name</label>
                        <div className="relative">
                           <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                           <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="e.g. John Doe"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-xs text-white focus:border-emerald-500/50 outline-none transition-all font-mono italic"
                           />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1 italic">Clearance Level</label>
                        <select 
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-xs text-white focus:border-emerald-500/50 outline-none transition-all appearance-none cursor-pointer font-mono italic"
                        >
                           <option value="student">Student / Analyst-in-Training</option>
                           <option value="teacher">Instructor / Lead Security</option>
                        </select>
                      </div>
                    </motion.div>
                 )}
               </AnimatePresence>

               <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1 italic">Comm Channel</label>
                  <div className="relative">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                     <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="operator@cybershield.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-xs text-white focus:border-emerald-500/50 outline-none transition-all font-mono italic"
                     />
                  </div>
               </div>

               <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1 italic">Security Key</label>
                  <div className="relative">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                     <input 
                      type="password" 
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-xs text-white focus:border-emerald-500/50 outline-none transition-all font-mono italic"
                     />
                  </div>
               </div>

               <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-2xl mt-6 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.1em] text-[10px] italic"
               >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? 'ESTABLISH LINK' : 'INITIALIZE PROTOCOL'}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
               </button>

               <div className="flex items-center gap-4 py-4">
                  <div className="flex-1 h-[1px] bg-slate-800" />
                  <span className="text-[9px] font-mono text-slate-700 font-bold tracking-widest italic">ENCRYPTED_OAUTH</span>
                  <div className="flex-1 h-[1px] bg-slate-800" />
               </div>

               <button 
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-4 bg-slate-50 hover:bg-white text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all uppercase tracking-[0.1em] text-[10px] italic"
               >
                  <Globe className="w-4 h-4" />
                  Connect with Global ID
               </button>
            </form>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-between gap-4 px-2">
           <div className="flex items-center gap-2 text-slate-700 font-bold italic">
              <Fingerprint className="w-4 h-4" />
              <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Biometric_Auth_Ready</span>
           </div>
           <div className="flex items-center gap-2 text-slate-700 font-bold italic">
              <Zap className="w-4 h-4 text-emerald-500/40" />
              <span className="text-[9px] font-mono uppercase tracking-[0.2em]">AES_256_ACTIVE</span>
           </div>
        </div>
      </div>
    </div>
  );
}
