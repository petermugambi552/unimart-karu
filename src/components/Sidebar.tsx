import { Link } from 'react-router-dom';
import { ShoppingBag, BookOpen, Laptop, Home as HomeIcon, Bike, ShieldAlert, PlusCircle, LayoutDashboard, Flag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';

export default function Sidebar() {
  const { isAdmin } = useAuth();

  const categories = [
    { name: 'Textbooks', icon: <BookOpen size={18} />, color: 'indigo' },
    { name: 'Electronics', icon: <Laptop size={18} />, color: 'slate' },
    { name: 'Dorm Living', icon: <HomeIcon size={18} />, color: 'slate' },
    { name: 'Transport', icon: <Bike size={18} />, color: 'slate' },
  ];

  const adminLinks = [
    { name: 'Moderate Listings', icon: <ShieldAlert size={18} />, badge: 12 },
    { name: 'User Reports', icon: <Flag size={18} /> },
    { name: 'Site Analytics', icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col p-6 shrink-0 h-full overflow-y-auto no-scrollbar">
      <nav className="space-y-8 flex-1">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#4F46E5] mb-4">Categories</p>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link 
                  to={`/marketplace?category=${cat.name}`}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all font-bold ${
                    cat.color === 'indigo' 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="opacity-80">{cat.icon}</span>
                  <span className="text-sm">{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {isAdmin && (
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-4">Admin Dashboard</p>
            <ul className="space-y-2">
              {adminLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to="/admin"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-rose-50 transition-all text-slate-700 font-bold group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 group-hover:text-rose-500 transition-colors">{link.icon}</span>
                      <span className="text-sm">{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      
      <div className="mt-8">
        <Link 
          to="/sell"
          className="w-full bg-[#4F46E5] text-white font-black py-4 rounded-2xl shadow-[0_4px_0_rgb(67,56,202)] active:translate-y-[2px] active:shadow-none transition-all text-xs uppercase flex items-center justify-center gap-2"
        >
          <PlusCircle size={16} /> List New Item
        </Link>
      </div>
    </aside>
  );
}
