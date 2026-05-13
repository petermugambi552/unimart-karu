import { motion } from 'motion/react';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-24 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[#4F46E5] mb-6 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              University Marketplace
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 max-w-4xl text-slate-900">
              BUY & RESELL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">ON CAMPUS.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 max-w-xl mb-12 font-medium leading-relaxed">
              The smartest way to trade at university. Quality items, 
              safe student-to-student transactions, zero hassle.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/marketplace"
                className="px-10 py-5 bg-[#4F46E5] text-white rounded-2xl font-black text-sm uppercase shadow-[0_6px_0_rgb(67,56,202)] hover:translate-y-[2px] hover:shadow-[0_4px_0_rgb(67,56,202)] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-3"
              >
                Browse Deals <ShoppingBag size={18} />
              </Link>
              <Link
                to="/sell"
                className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-black text-sm uppercase hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all flex items-center gap-3 shadow-sm"
              >
                Start Selling <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-white py-20 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Fresh Curation</h2>
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Hot!</span>
              </div>
              <p className="text-slate-500 font-medium italic">Hand picked for your academic journey</p>
            </div>
            <Link to="/marketplace" className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Electronics', count: '120+ Items', color: 'from-blue-100 to-indigo-100', text: 'text-indigo-700' },
              { title: 'Textbooks', count: '85+ Items', color: 'from-emerald-100 to-teal-100', text: 'text-emerald-700' },
              { title: 'Dorm Essentials', count: '45+ Items', color: 'from-rose-100 to-orange-100', text: 'text-rose-700' }
            ].map((cat) => (
              <motion.div
                key={cat.title}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-gradient-to-br ${cat.color} p-10 rounded-[40px] cursor-pointer group relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <h3 className={`text-3xl font-black mb-2 ${cat.text} tracking-tighter`}>
                    {cat.title}
                  </h3>
                  <p className="text-slate-600 font-bold text-sm">{cat.count}</p>
                </div>
                <div className="mt-12 flex justify-end">
                   <div className="w-14 h-14 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-white transition-all">
                    <ArrowRight size={24} className={cat.text} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
