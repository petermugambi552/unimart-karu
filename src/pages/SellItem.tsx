import { useState } from 'react';
import { Camera, Plus, Trash2, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export default function SellItem() {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Electronics',
    description: '',
    condition: 'Good',
    location: 'Main Campus'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    // Simulate API call for now
    setTimeout(() => {
      setLoading(false);
      navigate('/marketplace');
    }, 1500);
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 text-orange-600">
          <Sparkles size={40} />
        </div>
        <h1 className="text-4xl font-black tracking-tighter mb-4">WANT TO SELL?</h1>
        <p className="text-gray-600 mb-10">Sign in with your university account to list your items first.</p>
        <button 
          onClick={signInWithGoogle}
          className="w-full py-5 bg-[#4F46E5] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_6px_0_rgb(67,56,202)] hover:translate-y-[1px] hover:shadow-[0_5px_0_rgb(67,56,202)] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-3"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 invert" />
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-8 transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tighter decoration-amber-400 underline decoration-2 underline-offset-4">Go Back</span>
      </button>

      <h1 className="text-5xl font-black tracking-tighter mb-12 text-slate-900">LIST ITEM.</h1>

      <form onSubmit={handleSubmit} className="space-y-10 pb-20">
        {/* Image Upload Area */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="aspect-square border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:border-[#4F46E5] hover:bg-indigo-50/50 transition-all group shadow-sm bg-white">
            <Camera className="text-slate-300 group-hover:text-[#4F46E5] mb-2 transition-colors" size={28} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#4F46E5] transition-colors">Add Photo</span>
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="aspect-square bg-white border border-slate-100 rounded-[32px] shadow-sm flex items-center justify-center text-slate-200">
              <Plus size={24} />
            </div>
          ))}
        </div>

        <div className="space-y-8 bg-white p-8 md:p-12 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-400" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1">The Headline</label>
              <input 
                required
                type="text" 
                placeholder="Psychology 101 Book..."
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl focus:outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300 shadow-inner"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1">Price ($)</label>
              <input 
                required
                type="number" 
                placeholder="45"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl focus:outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300 shadow-inner"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1">Catalog Section</label>
              <select 
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl focus:outline-none transition-all font-bold text-slate-800 appearance-none cursor-pointer shadow-inner"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {['Electronics', 'Books', 'Furniture', 'Clothing', 'Kitchen', 'Other'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1">Dorm/Area</label>
              <select 
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl focus:outline-none transition-all font-bold text-slate-800 appearance-none cursor-pointer shadow-inner"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              >
                <option>Main Campus</option>
                <option>East Wing</option>
                <option>Library Area</option>
                <option>Dorms</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1">Narrative</label>
            <textarea 
              rows={4}
              placeholder="Good as new, only used for one semester..."
              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl focus:outline-none transition-all font-medium text-slate-800 placeholder:text-slate-300 shadow-inner resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-6 bg-[#4F46E5] text-white rounded-[32px] font-black text-xl tracking-tighter shadow-[0_8px_0_rgb(67,56,202)] hover:translate-y-[2px] hover:shadow-[0_6px_0_rgb(67,56,202)] active:translate-y-[5px] active:shadow-none transition-all disabled:bg-slate-200 disabled:shadow-none flex items-center justify-center gap-2 uppercase italic"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Confirm Listing'}
        </button>
      </form>
    </div>
  );
}
