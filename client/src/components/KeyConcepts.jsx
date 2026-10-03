import React from 'react';
import { Layers, Lightbulb, Compass, CheckCircle } from 'lucide-react';

export default function KeyConcepts({ keyConcepts = [] }) {
  if (!keyConcepts || keyConcepts.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <span>Key Concepts</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
              {keyConcepts.length} Pillars
            </span>
          </h2>
          <p className="text-xs text-slate-400">Fundamental building blocks required to understand this domain</p>
        </div>
      </div>

      {/* Grid of concept cards - FR-18 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {keyConcepts.map((concept, index) => {
          // Parse concept if it has title and description format "Title: Description"
          const parts = concept.split(':');
          const hasPrefix = parts.length > 1;
          const title = hasPrefix ? parts[0].trim() : `Concept ${index + 1}`;
          const description = hasPrefix ? parts.slice(1).join(':').trim() : concept;

          return (
            <div
              key={index}
              className="glass-card rounded-2xl p-5 border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold flex items-center justify-center">
                      0{index + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {title}
                    </h3>
                  </div>
                  <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-8">
                  {description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 pl-8">
                <span>Core Pillar</span>
                <span className="text-indigo-600 font-semibold flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1 text-emerald-500" /> Essential Concept
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
