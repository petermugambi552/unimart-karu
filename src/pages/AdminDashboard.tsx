import { useState } from 'react';
import { Shield, Users, ShoppingBag, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  const { isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('items');

  if (loading) return null;
  if (!isAdmin) return <Navigate to="/" />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-600 rotate-3 shadow-lg border-2 border-white">
          <Shield size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">ADMIN HUB.</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Restricted Personnel Workspace</p>
        </div>
      </div>

      {/* Design-inspired Stats Overlay */}
      <div className="mb-12 bg-slate-900 rounded-[40px] p-8 md:p-10 flex flex-col md:flex-row justify-around gap-8 border-t-4 border-amber-400 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full blur-3xl opacity-50" />
        <div className="text-center group relative z-10">
          <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center justify-center gap-1">
            <Clock size={10} /> Total Sales Today
          </p>
          <h4 className="text-white text-3xl font-black font-mono tracking-tighter group-hover:scale-110 transition-transform">$1,240.45</h4>
        </div>
        <div className="hidden md:block h-16 w-px bg-slate-700"></div>
        <div className="text-center group relative z-10">
          <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-2">Active Listings</p>
          <h4 className="text-white text-3xl font-black font-mono tracking-tighter group-hover:scale-110 transition-transform">1,842</h4>
        </div>
        <div className="hidden md:block h-16 w-px bg-slate-700"></div>
        <div className="text-center group relative z-10">
          <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-2">New Users</p>
          <h4 className="text-white text-3xl font-black font-mono tracking-tighter group-hover:scale-110 transition-transform">48</h4>
        </div>
        <div className="hidden md:block h-16 w-px bg-slate-700"></div>
        <div className="text-center group relative z-10">
          <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-2">Reports</p>
          <h4 className="text-rose-500 text-3xl font-black font-mono tracking-tighter group-hover:scale-110 transition-transform">0</h4>
        </div>
      </div>

      <div className="flex gap-10 mb-12 border-b border-slate-100">
        {[
          { id: 'items', label: 'Monitor Listings', icon: <ShoppingBag size={18} /> },
          { id: 'users', label: 'Student Directory', icon: <Users size={18} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pb-6 px-1 text-xs font-black uppercase tracking-widest transition-all relative ${
              activeTab === tab.id ? 'text-rose-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.icon} {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="adminTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-rose-600 rounded-t-full" 
              />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'items' && (
        <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Listed Item</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Seller Identity</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Price Point</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Lifecycle</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { title: 'MacBook Air M1 (2020)', seller: 'Alex R.', price: '$750', status: 'Active' },
                  { title: 'Intro to Psych Textbook', seller: 'James O.', price: '$45', status: 'Flagged' },
                  { title: 'IKEA Swivel Chair', seller: 'Elena M.', price: '$80', status: 'Active' },
                  { title: 'Noise Cancelling Buds', seller: 'Sarah L.', price: '$120', status: 'Active' }
                ].map((item, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-10 py-8">
                      <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{item.title}</span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-500">
                          {item.seller[0]}
                        </div>
                        <span className="text-sm font-bold text-slate-600">{item.seller}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 font-black text-indigo-600 tracking-tighter">{item.price}</td>
                    <td className="px-10 py-8">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        item.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <button className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                          <Trash2 size={16} />
                        </button>
                        <button className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                          <CheckCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
