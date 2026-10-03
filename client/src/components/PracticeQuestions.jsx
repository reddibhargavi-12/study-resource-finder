import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle, Sparkles } from 'lucide-react';

export default function PracticeQuestions({ practiceQuestions = [] }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState({});

  if (!practiceQuestions || practiceQuestions.length === 0) return null;

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const toggleComplete = (idx, e) => {
    e.stopPropagation();
    setCompletedQuestions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const completedCount = Object.values(completedQuestions).filter(Boolean).length;

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-sm">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <span>Practice Questions & Exam Prep</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {practiceQuestions.length} Questions
              </span>
            </h2>
            <p className="text-xs text-slate-400">Self-assessment queries to test your conceptual readiness</p>
          </div>
        </div>

        {/* Progress tracker pill */}
        <div className="flex items-center space-x-2 self-start sm:self-auto text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
          <span>Mastered:</span>
          <span className="text-emerald-600 font-bold">{completedCount} / {practiceQuestions.length}</span>
        </div>
      </div>

      {/* Question Cards Grid - FR-21 */}
      <div className="space-y-3">
        {practiceQuestions.map((question, index) => {
          const isDone = !!completedQuestions[index];
          const isExpanded = expandedIndex === index;

          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden shadow-sm ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/10'
                  : 'border-slate-200 hover:border-amber-300'
              }`}
            >
              <div
                onClick={() => toggleExpand(index)}
                className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-start space-x-3.5 flex-1">
                  {/* Mark as mastered button */}
                  <button
                    type="button"
                    onClick={(e) => toggleComplete(index, e)}
                    className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-colors border ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : 'border-slate-300 hover:border-slate-400 text-transparent'
                    }`}
                    title={isDone ? 'Mark as uncompleted' : 'Mark as mastered'}
                  >
                    <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                        Question 0{index + 1}
                      </span>
                      {isDone && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                          Mastered
                        </span>
                      )}
                    </div>
                    <p className={`text-base font-semibold ${isDone ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                      {question}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400 hover:text-slate-600 p-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Collapsible Answer / Guidance Hint */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/70 text-sm text-slate-600 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-700">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tutor Guidance & Suggested Answer Angle:</span>
                  </div>
                  <p className="leading-relaxed">
                    To answer this in an interview or university exam, structure your response into:
                    (1) Formal definition, (2) Architectural or mathematical rationale, (3) A brief concrete code or domain demonstration, and (4) Known edge cases or performance impacts.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
