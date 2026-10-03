import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import { BookOpen, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
          {/* Main Top Navigation - FR-32 */}
          <Navbar onOpenAuth={() => setAuthModalOpen(true)} />

          {/* Core Route Viewports */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Student Auth Modal */}
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
          />

          {/* Footer with academic project attribution */}
          <footer className="border-t border-slate-200/80 bg-white py-8 px-4 sm:px-6 lg:px-8 mt-12 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-700">Study Resource Finder</span>
                <span>— AI Academic Discovery</span>
              </div>

              <div className="flex items-center space-x-1">
                <span>Designed & Built for</span>
                <span className="font-semibold text-slate-800">SITAM CSE</span>
                <span>• Author:</span>
                <span className="font-bold text-blue-700">Reddi Bhargavi</span>
                <span className="text-slate-400 font-mono text-[11px]">(24B61A05C9)</span>
              </div>

              <div className="flex items-center space-x-3 text-slate-400">
                <span className="flex items-center">
                  <Sparkles className="w-3 h-3 mr-1 text-emerald-500" /> Free-Tier Gemini Ready
                </span>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
