import React from 'react';
import { Sparkles, Loader2, BookOpen, Layers, HelpCircle, GitFork } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4 space-y-8 animate-pulse">
      {/* Loading Banner with Exact Text required by FR-05 */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md animate-spin-slow">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center">
              Finding useful study resources...
            </h3>
            <p className="text-sm text-slate-500">
              Querying Gemini academic engine to assemble structured explanations, concepts, and practice problems...
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
          <span>Curating Learning Path</span>
        </div>
      </div>

      {/* Skeleton Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-20 bg-white rounded-xl border border-slate-200 p-4 space-y-2">
            <div className="h-3 w-16 bg-slate-200 rounded"></div>
            <div className="h-5 w-24 bg-slate-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Skeleton AI Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <div className="h-5 w-32 bg-slate-200 rounded"></div>
        </div>
        <div className="space-y-2.5">
          <div className="h-4 w-full bg-slate-200 rounded"></div>
          <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
          <div className="h-4 w-4/6 bg-slate-200 rounded"></div>
        </div>
      </div>

      {/* Skeleton Concept Cards Grid */}
      <div className="space-y-3">
        <div className="h-5 w-28 bg-slate-200 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="h-4 w-1/3 bg-slate-300 rounded"></div>
              <div className="h-3 w-full bg-slate-200 rounded"></div>
              <div className="h-3 w-4/5 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton Questions & Path */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="h-5 w-36 bg-slate-300 rounded"></div>
          <div className="h-12 bg-slate-100 rounded-xl"></div>
          <div className="h-12 bg-slate-100 rounded-xl"></div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="h-5 w-36 bg-slate-300 rounded"></div>
          <div className="h-12 bg-slate-100 rounded-xl"></div>
          <div className="h-12 bg-slate-100 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
