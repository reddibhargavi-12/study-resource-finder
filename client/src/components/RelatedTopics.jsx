import React from 'react';
import { GitFork, ArrowUpRight, Sparkles } from 'lucide-react';

export default function RelatedTopics({ relatedTopics = [], onSelectTopic }) {
  if (!relatedTopics || relatedTopics.length === 0) return null;

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center space-x-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
          <GitFork className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <span>Related Topics & Next Steps</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Interactive Explorer
            </span>
          </h2>
          <p className="text-xs text-slate-400">Click any topic chip below to launch an instant connected search (FR-23)</p>
        </div>
      </div>

      {/* Clickable Related Topic Chips - FR-22, FR-23 */}
      <div className="flex flex-wrap gap-2.5">
        {relatedTopics.map((topic, index) => (
          <button
            key={index}
            id={`related-topic-chip-${index}`}
            type="button"
            onClick={() => onSelectTopic(topic)}
            className="group inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-slate-700 hover:text-white border border-slate-200 hover:border-transparent transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 text-sm font-medium"
          >
            <span>{topic}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          </button>
        ))}
      </div>
    </section>
  );
}
