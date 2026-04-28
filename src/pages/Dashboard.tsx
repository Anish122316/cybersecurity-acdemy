import React from 'react';
import { 
  Terminal, 
  ShieldAlert, 
  Users, 
  Activity,
  PlayCircle,
  Clock,
  ChevronRight,
  Zap,
  TrendingUp
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const data = [
  { name: 'Mon', score: 40 },
  { name: 'Tue', score: 65 },
  { name: 'Wed', score: 50 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 70 },
  { name: 'Sat', score: 90 },
  { name: 'Sun', score: 95 },
];

const stats = [
  { label: 'Threats Neutralized', value: '1,284', icon: ShieldAlert, color: 'text-rose-500' },
  { label: 'Active Students', value: '42.5k', icon: Users, color: 'text-cyan-500' },
  { label: 'System Uptime', value: '99.9%', icon: Activity, color: 'text-emerald-500' },
  { label: 'Labs Completed', value: '342', icon: Terminal, color: 'text-amber-500' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Title from Design */}
      <div className="pb-2">
        <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-white italic">COMMAND DASHBOARD</h1>
        <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase italic tracking-widest">CORE_STATION // {auth.currentUser?.email || 'ANON_USER'}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-emerald-500/40 transition-all group flex flex-col justify-between h-32"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{stat.label}</span>
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <h3 className="text-3xl font-light text-white tracking-tighter italic">{stat.value}</h3>
              <span className="text-[10px] text-emerald-400 font-bold">READY</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1 rounded-full mt-auto overflow-hidden">
              <div className="bg-emerald-500 h-full w-[65%] shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Performance Chart Area */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-white italic">Technical Velocity</h2>
              <p className="text-[10px] text-slate-500 font-mono italic">Real-time learning metrics</p>
            </div>
            <div className="flex gap-4 text-[10px] uppercase font-bold italic">
               <span className="text-emerald-400 border-b border-emerald-400 pb-1 cursor-pointer">Learning Path</span>
               <span className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">Lab Efficiency</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full bg-slate-950/20 rounded-xl p-4 border border-slate-800/30">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#34d399' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Radar - High Density Column */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
             <h2 className="text-xs font-bold uppercase text-white italic">Course Radar</h2>
             <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-[10px] rounded border border-cyan-500/20 italic">TRACKING_ACTIVE</span>
          </div>
          
          <div className="flex-1 p-6 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase italic">Active Protocol</span>
                <span className="text-xs font-mono text-emerald-400">72%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-1000" 
                  style={{ width: '72%' }}
                />
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-emerald-500/30 transition-all cursor-pointer">
                <div className="bg-slate-800 p-2 rounded-lg">
                  <PlayCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Network Decryption</h4>
                  <p className="text-[10px] text-slate-500 font-mono italic">MOD_004: RSA SCHEMES</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800/50">
               <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] italic mb-4">Pending Labs</h3>
               <div className="space-y-3">
                  {[
                    { title: 'SQLi Sandbox', time: '14:00 PM', level: 'HS' },
                    { title: 'Buffer Overflow', time: 'Tomorrow', level: 'ADV' },
                  ].map((lab) => (
                    <div key={lab.title} className="flex items-center justify-between p-3 bg-slate-800/30 border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer group">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 group-hover:text-emerald-400 transition-colors">
                             {lab.level}
                          </div>
                          <div>
                             <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors italic">{lab.title}</h4>
                             <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                                <Clock className="w-2.5 h-2.5" />
                                {lab.time}
                             </div>
                          </div>
                       </div>
                       <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                    </div>
                  ))}
               </div>
            </div>

            <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] group italic">
              <Zap className="w-4 h-4" />
              Elevate to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { auth } from '@/src/lib/firebase';

// End of file
