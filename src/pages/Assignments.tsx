import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  MoreVertical,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  feedback?: string;
  fileUrl?: string;
}

const assignments: Assignment[] = [
  {
    id: 'lab-01',
    title: 'Network Packet Analysis Report',
    course: 'Cybersecurity Foundations',
    dueDate: '2024-05-15',
    status: 'graded',
    grade: 'A',
    feedback: 'Excellent work on identifying the malicious handshake. Your decryption logic was spot on.'
  },
  {
    id: 'lab-02',
    title: 'SQL Injection Vulnerability Scan',
    course: 'Web Security Labs',
    dueDate: '2024-05-20',
    status: 'submitted',
    fileUrl: 'report_v1.pdf'
  },
  {
    id: 'lab-03',
    title: 'RSA Algorithm Implementation',
    course: 'Cybersecurity Foundations',
    dueDate: '2024-05-25',
    status: 'pending'
  }
];

export default function Assignments() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const getStatusStyle = (status: Assignment['status']) => {
    switch (status) {
      case 'graded': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'submitted': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-white italic">LAB REPORTS</h1>
          <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase italic tracking-widest">SUBMISSIONS // ASSET_CONTROL</p>
        </div>
        <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-2 shadow-inner">
           <ShieldCheck className="w-4 h-4 text-emerald-400" />
           <span className="text-[10px] font-mono text-slate-400 font-bold tracking-widest italic animate-pulse">SECURE UPLOAD ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assignment List */}
        <div className="lg:col-span-2 space-y-4">
          {assignments.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/20 transition-all group shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800 shadow-inner group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors uppercase italic tracking-tight">{item.title}</h3>
                    <p className="text-[10px] text-slate-500 font-mono italic uppercase tracking-widest">{item.course}</p>
                  </div>
                </div>
                <div className={cn(
                  "text-[9px] font-bold font-mono px-2 py-1 rounded border uppercase tracking-[0.2em] italic",
                  getStatusStyle(item.status)
                )}>
                  {item.status}
                </div>
              </div>

              <div className="flex items-center gap-8 mb-6">
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 font-bold tracking-tight">
                  <Clock className="w-3.5 h-3.5" />
                  <span>DUE_DATE: {item.dueDate}</span>
                </div>
                {item.grade && (
                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono font-bold tracking-tight italic bg-emerald-500/5 px-2 py-0.5 rounded-md border border-emerald-500/10">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>GRADE_INDEX: {item.grade}</span>
                  </div>
                )}
              </div>

              {item.feedback && (
                <div className="mb-6 p-4 bg-slate-950/50 border border-slate-800 rounded-xl italic text-xs text-slate-400 leading-relaxed border-l-4 border-l-emerald-500/30">
                  "{item.feedback}"
                </div>
              )}

              <div className="flex justify-end gap-3">
                {item.status === 'pending' ? (
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-xl transition-all uppercase tracking-[0.1em] italic shadow-[0_0_20px_rgba(16,185,129,0.1)] group">
                    <Upload className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                    Submit Report
                  </button>
                ) : (
                  <>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 text-[10px] font-bold rounded-xl transition-all uppercase tracking-[0.1em] italic">
                      <Download className="w-3.5 h-3.5" />
                      Archive Log
                    </button>
                    {item.status === 'graded' && (
                      <button className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold rounded-xl hover:bg-cyan-600/20 transition-all uppercase tracking-[0.1em] italic">
                        <Award className="w-3.5 h-3.5" />
                        Credentials
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upload Sidebar */}
        <div className="space-y-6">
           <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] to-transparent pointer-events-none" />
              <div className="w-16 h-16 bg-emerald-500/5 border border-dashed border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-emerald-400 animate-bounce" />
              </div>
              <h3 className="text-sm font-bold mb-2 uppercase tracking-[0.2em] text-white italic">RAPID UPLOAD</h3>
              <p className="text-[10px] text-slate-500 mb-8 max-w-[200px] font-mono leading-relaxed italic uppercase font-bold tracking-widest">Transmit lab reports to neutral-core intelligence unit.</p>
              
              <label className="w-full">
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  accept=".pdf"
                />
                <div className={cn(
                  "w-full py-4 px-4 border border-zinc-800 rounded-2xl flex flex-col gap-2 cursor-pointer transition-all shadow-inner",
                  selectedFile ? "bg-emerald-500/10 border-emerald-500" : "bg-slate-950 border-slate-800 hover:border-slate-700"
                )}>
                  <span className="text-[10px] font-mono font-bold text-slate-300 truncate">
                    {selectedFile ? selectedFile.name : 'Choose PDF File'}
                  </span>
                  {!selectedFile && <span className="text-[9px] text-slate-700 font-mono font-bold uppercase tracking-widest">LIMIT: 10MB</span>}
                </div>
              </label>

              {selectedFile && (
                <button className="w-full mt-4 py-4 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] uppercase italic tracking-widest">
                  Process Hash
                </button>
              )}
           </div>

           <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] italic text-white">Security Protocol</h3>
              </div>
              <ul className="space-y-4">
                 {[
                   'PDF format signature required',
                   'Student SHA-256 hash injection',
                   'Real-time malware heuristics',
                   'Instructor audit trail enabled'
                 ].map(rule => (
                   <li key={rule} className="flex gap-3 text-[10px] text-slate-400 font-bold italic uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 bg-emerald-500/30 rounded-full mt-1 shrink-0" />
                      {rule}
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
