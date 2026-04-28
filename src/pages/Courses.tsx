import React from 'react';
import { 
  Play, 
  Lock, 
  BookOpen, 
  Clock, 
  Award,
  Search,
  Filter,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const courses = [
  {
    id: 'cyber-fundamentals',
    title: 'Cybersecurity Foundations',
    instructor: 'Dr. Sarah Chen',
    duration: '12h 45m',
    lessons: 24,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    progress: 72,
    difficulty: 'Beginner',
    tags: ['Network', 'Basics']
  },
  {
    id: 'pentesting-pro',
    title: 'Ethical Hacking & Pentesting',
    instructor: 'Markus Vane',
    duration: '22h 10m',
    lessons: 48,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    progress: 0,
    locked: true,
    difficulty: 'Advanced',
    tags: ['Offensive', 'Exploit']
  },
  {
    id: 'soc-analyst',
    title: 'SOC Analyst Bootcamp',
    instructor: 'Alex Rivera',
    duration: '15h 30m',
    lessons: 32,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800',
    progress: 0,
    difficulty: 'Intermediate',
    tags: ['Defensive', 'SOC']
  }
];

export default function Courses() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-white italic">COURSE ARCHIVE</h1>
          <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase italic tracking-widest">DIRECTORY // TRAINING_MODULES</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search data modules..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:border-emerald-500/50 outline-none transition-all font-mono italic"
            />
          </div>
          <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:border-slate-700 transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all flex flex-col shadow-2xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.8] group-hover:grayscale-[0.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                {course.tags.map(tag => (
                  <span key={tag} className="bg-slate-950/80 backdrop-blur-md text-[9px] font-bold font-mono text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 uppercase tracking-widest italic">
                    {tag}
                  </span>
                ))}
              </div>

              {course.locked && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <Lock className="w-8 h-8 text-rose-500" />
                    <span className="text-[10px] font-bold font-mono text-white uppercase tracking-[0.3em] italic">Access Denied</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                 <span className={cn(
                  "text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest italic",
                  course.difficulty === 'Beginner' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                  course.difficulty === 'Intermediate' ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                  "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                )}>
                  {course.difficulty}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-[10px] font-mono font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  {course.rating}
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-emerald-400 transition-colors uppercase italic tracking-tight">{course.title}</h3>
              <p className="text-[10px] text-slate-500 mb-5 font-mono uppercase italic tracking-widest">Instructor: {course.instructor}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px]">
                  <Clock className="w-3.5 h-3.5 text-slate-600" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px]">
                  <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                  <span>{course.lessons} MODULES</span>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                {course.progress > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] font-bold font-mono text-slate-500 italic">
                      <span>SYNC STATUS</span>
                      <span className="text-emerald-400">{course.progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner font-bold">
                      <div 
                        className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-1000" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <button 
                  disabled={course.locked}
                  className={cn(
                    "w-full py-3 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase italic flex items-center justify-center gap-2 transition-all",
                    course.progress > 0 
                      ? "bg-slate-950 text-emerald-400 border border-emerald-500/20 hover:bg-slate-800"
                      : "bg-emerald-600 text-slate-950 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
                    course.locked && "opacity-50 cursor-not-allowed bg-slate-950 text-slate-600 border-slate-800"
                  )}
                >
                  {course.progress > 0 ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Resume Link
                    </>
                  ) : (
                    <>
                      <Award className="w-3.5 h-3.5" />
                      Initialize Module
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
