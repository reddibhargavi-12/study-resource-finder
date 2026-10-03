import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Clock,
  Bookmark,
  Trash2,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  Layers,
  BookOpen,
  Search
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const { recentSearches, favoriteTopics, clearHistory, addRecentSearch } = useAuth();
  const [popularTopics] = useState([
    'Python Inheritance',
    'DBMS Normalization',
    'Photosynthesis',
    'Binary Search Trees',
    'Quantum Computing',
    'React Hooks & State'
  ]);

  const handleSearch = (topic) => {
    if (!topic || !topic.trim()) return;
    addRecentSearch(topic.trim());
    navigate(`/search?q=${encodeURIComponent(topic.trim())}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Hero Section - FR-33 */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-blue-400/20 via-indigo-400/20 to-violet-400/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
          <span>AI-Powered Study Resource Discovery Platform</span>
        </div>

        {/* Hero Heading - FR-33 */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-5 max-w-4xl mx-auto">
          Find the Right Resources for{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Any Topic
          </span>
        </h1>

        {/* Subtitle - FR-33 */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Type any academic concept and instantly receive structured AI study summaries, key concepts, code examples, practice questions, and custom roadmaps.
        </p>

        {/* Large Search Box & Search Resources Button - FR-33 */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} large={true} />
        </div>

        {/* Curated Popular Academic Prompts */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto text-xs sm:text-sm">
          <span className="text-slate-400 font-medium flex items-center mr-1">
            <TrendingUp className="w-3.5 h-3.5 mr-1 text-slate-400" /> Popular:
          </span>
          {popularTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleSearch(topic)}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 font-medium transition-all shadow-sm active:scale-95"
            >
              {topic}
            </button>
          ))}
        </div>
      </section>

      {/* Persistence Lists: Recent Searches & Favourite Topics (FR-26 to FR-31) */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Recent Searches Box - FR-27, FR-28 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Recent Searches</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {recentSearches.length}
                  </span>
                </div>

                {/* FR-28: Clear History button */}
                {recentSearches.length > 0 && (
                  <button
                    id="clear-recent-searches-btn"
                    onClick={clearHistory}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors"
                    title="Clear history"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {recentSearches.length > 0 ? (
                <div className="space-y-2 mt-3">
                  {recentSearches.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSearch(item)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-100 hover:border-blue-200 cursor-pointer transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-900">
                          {item}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs sm:text-sm">
                  No recent searches yet. Search any academic subject above to see your history!
                </div>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              * Stored securely in browser localStorage (FR-26)
            </div>
          </div>

          {/* Favourite Topics Box - FR-30 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Favourite Topics</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {favoriteTopics.length} Saved
                  </span>
                </div>
              </div>

              {favoriteTopics.length > 0 ? (
                <div className="space-y-2 mt-3">
                  {favoriteTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSearch(topic)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-100 hover:border-emerald-200 cursor-pointer transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <Bookmark className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                        <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-900">
                          {topic}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs sm:text-sm">
                  No bookmarked topics yet. Click "Save Topic" on any search dashboard to access it instantly here.
                </div>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              * Saved topics persist across sessions (FR-30)
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Google Gemini AI Engine</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Generates high-precision, verified study resources and tailored explanations for any subject.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">7 Structured Dashboard Pillars</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Overview, concepts, bullet points, syntax code, exam questions, related topics, and roadmaps.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Interactive Student Prep</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mark exam questions as mastered and check off sequential learning path milestones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
