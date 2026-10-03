import React, { useState } from 'react';
import { Milestone, CheckCircle2, Circle, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LearningPath({ learningPath = [], topic = '' }) {
  const [completedSteps, setCompletedSteps] = useState({});

  if (!learningPath || learningPath.length === 0) return null;

  const toggleStep = (index) => {
    const nextState = {
      ...completedSteps,
      [index]: !completedSteps[index]
    };
    setCompletedSteps(nextState);

    // If all steps completed, celebrate with confetti!
    const totalDone = Object.values(nextState).filter(Boolean).length;
    if (totalDone === learningPath.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const doneCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((doneCount / learningPath.length) * 100);

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100 shadow-sm">
            <Milestone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <span>Suggested Learning Path</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-800">
                Step-by-Step
              </span>
            </h2>
            <p className="text-xs text-slate-400">Sequential roadmap to build mastery from scratch</p>
          </div>
        </div>

        {/* Dynamic Progress indicator */}
        <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-700">{progressPercent}% Completed</div>
            <div className="text-[10px] text-slate-400">{doneCount} of {learningPath.length} Milestones</div>
          </div>
          <div className="w-20 bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-violet-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Ordered Learning Path Sequence - FR-24 */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-violet-500 before:to-emerald-500">
        {learningPath.map((step, index) => {
          const isDone = !!completedSteps[index];

          return (
            <div
              key={index}
              onClick={() => toggleStep(index)}
              className="relative flex items-start space-x-4 group cursor-pointer"
            >
              {/* Step indicator node */}
              <div
                className={`absolute -left-6 sm:-left-8 mt-1 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                    : 'bg-white border-violet-400 group-hover:border-violet-600 text-violet-600'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="text-[10px] font-bold">{index + 1}</span>
                )}
              </div>

              {/* Step card */}
              <div
                className={`flex-1 p-4 rounded-2xl border transition-all duration-200 ${
                  isDone
                    ? 'bg-emerald-50/20 border-emerald-200'
                    : 'bg-slate-50/70 border-slate-200/80 group-hover:bg-white group-hover:border-violet-300 group-hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-violet-700 uppercase tracking-wider">
                    Milestone 0{index + 1}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {isDone ? 'Completed' : 'Click to mark complete'}
                  </span>
                </div>
                <p className={`text-sm sm:text-base font-medium ${isDone ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                  {step}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {progressPercent === 100 && (
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between shadow-lg shadow-emerald-500/20 animate-fadeIn">
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-yellow-300 animate-bounce" />
            <div>
              <h4 className="font-bold text-base">Mastery Complete!</h4>
              <p className="text-xs text-emerald-100">You have completed all roadmap milestones for {topic}.</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-xl text-xs font-semibold">
            Ready for Examination!
          </span>
        </div>
      )}
    </section>
  );
}
