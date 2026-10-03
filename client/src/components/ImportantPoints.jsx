import React from 'react';
import { CheckSquare, CheckCircle2, BookmarkCheck } from 'lucide-react';

export default function ImportantPoints({ importantPoints = [] }) {
  if (!importantPoints || importantPoints.length === 0) return null;

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
          <BookmarkCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <span>Important Points & Exam Takeaways</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              High-Yield
            </span>
          </h2>
          <p className="text-xs text-slate-400">Critical rules, syntax guidelines, and frequent exam questions</p>
        </div>
      </div>

      {/* Concise Bullet List - FR-19 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {importantPoints.map((point, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3.5 rounded-2xl bg-emerald-50/30 border border-emerald-100/70 hover:bg-emerald-50/60 transition-colors"
          >
            <div className="mt-0.5 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[2.2]" />
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {point}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
