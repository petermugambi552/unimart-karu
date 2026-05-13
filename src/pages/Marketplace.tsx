import { useState } from 'react';
import { Search, SlidersHorizontal, Tag, Clock, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORIES = ['All', 'Electronics', 'Books', 'Furniture', 'Clothing', 'Kitchen', 'Other'];

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for initial preview
  const mockItems = [
    { id: '1', title: 'Calculus Early Transcendentals', price: 45, seller: 'James O.', category: 'Books', condition: 'USED-GOOD', image: 'https://picsum.photos/seed/book1/400/300' },
    { id: '2', title: 'Noise Cancelling Headphones', price: 120, seller: 'Sarah L.', category: 'Electronics', condition: 'LIKE NEW', image: 'https://picsum.photos/seed/headphones/400/300' },
    { id: '3', title: 'IKEA Swivel Chair', price: 60, seller: 'Mike T.', category: 'Furniture', condition: 'USED-GOOD', image: 'https://picsum.photos/seed/chair/400/300' },
    { id: '4', title: 'MacBook Air M1', price: 750, seller: 'Alex R.', category: 'Electronics', condition: 'NEGOTIABLE', image: 'https://picsum.photos/seed/laptop/400/300' },
    { id: '5', title: 'Kitchen Blender', price: 30, seller: 'Elena M.', category: 'Kitchen', condition: 'NEW', image: 'https://picsum.photos/seed/blender/400/300' },
    { id: '6', title: 'Warm Hoodie (Medium)', price: 25, seller: 'Kevin K.', category: 'Clothing', condition: 'GOOD', image: 'https://picsum.photos/seed/hoodie/400/300' },
  ];

  const filteredItems = mockItems.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Fresh Listings <span className="text-rose-500 text-sm">Hot!</span></h2>
          <p className="text-slate-500 font-medium">Deals from students in your dorm area</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4F46E5] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-64 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all italic">
            <SlidersHorizontal size={14} /> Sort: Newest
          </button>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex overflow-x-auto gap-2 pb-10 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2.5 rounded-full whitespace-nowrap text-xs font-black tracking-widest uppercase transition-all shadow-sm ${
              selectedCategory === cat 
                ? 'bg-[#4F46E5] text-white shadow-indigo-200' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-[#4F46E5] hover:text-[#4F46E5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col relative cursor-pointer hover:shadow-xl transition-all"
          >
            <div className={`absolute top-6 right-6 ${
              item.condition === 'LIKE NEW' ? 'bg-emerald-500' : 
              item.condition === 'NEGOTIABLE' ? 'bg-rose-500' : 'bg-indigo-600'
            } text-white text-[9px] font-black px-2.5 py-1 rounded-full z-10 uppercase tracking-widest`}>
              {item.condition}
            </div>
            
            <div className="h-48 bg-slate-100 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
               <img 
                 src={item.image} 
                 alt={item.title} 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                 referrerPolicy="no-referrer"
               />
            </div>

            <div className="px-1 flex-1 flex flex-col">
              <h3 className="font-bold text-slate-800 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-[10px] text-slate-500 mb-4 font-bold uppercase tracking-tight">
                Listed by {item.seller} • 2 hrs ago
              </p>
              
              <div className="mt-auto flex justify-between items-center pt-2">
                <span className="text-2xl font-black text-indigo-600 tracking-tighter">${item.price}</span>
                <button className="w-10 h-10 bg-amber-400 rounded-xl hover:bg-amber-300 shadow-sm flex items-center justify-center transition-all hover:rotate-3 active:scale-95 text-lg">
                  <ShoppingBag size={18} className="text-indigo-900" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
              <Search className="text-slate-400" size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">NOTHING HERE.</h3>
            <p className="text-slate-500 font-medium italic">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
