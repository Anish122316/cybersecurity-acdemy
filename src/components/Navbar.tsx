import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  MessageSquare, 
  ClipboardList, 
  TrendingUp,
  Settings,
  LogIn,
  LogOut
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { auth } from '@/src/lib/firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Video, label: 'Live Sessions', path: '/live' },
    { icon: MessageSquare, label: 'AI Analyst', path: '/ai-analyst' },
    { icon: ClipboardList, label: 'Assignments', path: '/assignments' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50 shadow-2xl">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center border border-slate-700/50">
          <Shield className="w-5 h-5 text-slate-950" />
        </div>
        <span className="font-bold tracking-tight text-white uppercase text-sm italic">
          Cyber<span className="text-emerald-400">Shield</span> Academy
        </span>
      </div>

      <div className="flex-1 px-4 space-y-1 mt-4">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 ml-2 italic">Core Terminal</div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 border border-transparent",
              isActive 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,183,129,0.05)]" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800 group hover:border-slate-700 transition-all cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400 group-hover:scale-110 transition-transform">
             {auth.currentUser?.displayName?.substring(0, 2).toUpperCase() || 'AR'}
          </div>
          <div className="flex-1 min-w-0">
             <p className="text-xs font-semibold text-white truncate">{auth.currentUser?.displayName || 'Operator'}</p>
             <p className="text-[10px] text-slate-500 truncate uppercase font-mono">ID: {auth.currentUser?.uid.substring(0, 5) || '00482'}</p>
          </div>
          <LogOut 
            onClick={(e) => { e.stopPropagation(); handleLogout(); }} 
            className="w-4 h-4 text-slate-600 hover:text-rose-500 transition-colors" 
          />
        </div>
      </div>
    </nav>
  );
}
