import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './Sidebar';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="h-16 bg-[#4F46E5] flex items-center justify-between px-6 lg:px-8 shadow-lg z-50 text-white shrink-0 sticky top-0">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center border-2 border-white rotate-3 shadow-md">
            <span className="text-indigo-900 font-black text-xl italic leading-none">U</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic underline decoration-amber-400 underline-offset-4 hidden sm:block">
            UniMart
          </h1>
        </Link>
      </div>
      
      <div className="flex-1 max-w-md mx-4 lg:mx-8">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 group-focus-within:text-amber-400 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search textbooks, gadgets..." 
            className="w-full py-2 pl-10 pr-4 rounded-full text-slate-900 border-none ring-2 ring-indigo-300 focus:ring-amber-400 focus:outline-none placeholder:text-slate-400 text-sm font-medium transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end mr-1">
              <span className="text-[10px] font-black uppercase opacity-80 leading-none tracking-widest">
                {isAdmin ? 'Admin Mode' : 'Student'}
              </span>
              <span className="text-xs font-medium opacity-90 truncate max-w-[120px]">
                {user.email}
              </span>
            </div>
            <div className="group relative">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-amber-400 rounded-full border-2 border-white shadow-inner flex items-center justify-center text-indigo-900 font-bold overflow-hidden cursor-pointer">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  user.displayName?.[0] || 'U'
                )}
              </div>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 hidden group-hover:block text-slate-800">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all text-sm font-bold"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/sell')}
            className="px-6 py-2 bg-amber-400 text-indigo-900 rounded-full text-sm font-black uppercase hover:bg-amber-300 transition-all shadow-sm"
          >
            Sign In
          </button>
        )}
        
        {/* Mobile menu toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[70] shadow-2xl flex flex-col pt-16"
            >
              <div className="p-6">
                <Sidebar /> {/* Reusing the sidebar for mobile menu */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
