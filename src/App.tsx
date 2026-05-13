import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import SellItem from './pages/SellItem';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="h-screen w-full bg-[#F3F4F6] flex flex-col overflow-hidden font-sans text-slate-800 selection:bg-indigo-100">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-[#F9FAFB] overflow-y-auto no-scrollbar relative">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/sell" element={<SellItem />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}
