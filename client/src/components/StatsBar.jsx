import React from 'react';
import { Bookmark, Check, Layers, HelpCircle, GitFork, Award, BarChart3, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

export default function StatsBar({
  topic = '',
  difficulty = 'Beginner',
  conceptCount = 0,
  questionCount = 0,
  relatedCount = 0,
  isSaved = false,
  onToggleSave,
}) {
  const getDifficultyBadge = (diff) => {
    const d = (diff || 'Beginner').toLowerCase();
    if (d.includes('advanced')) {
      return {
        bg: 'bg-purple-50 text-purple-700 border-purple-200',
        dot: 'bg-purple-500',
        label: 'Advanced Level'
      };
    }
    if (d.includes('intermediate')) {
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        label: 'Intermediate Level'
      };
    }
    return {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      label: 'Beginner Level'
    };
  };

  const badge = getDifficultyBadge(difficulty);

  // Micro chart data representing curriculum balance
  const statsChartData = [
    { name: 'Concepts', count: conceptCount, color: '#2563EB' },
    { name: 'Questions', count: questionCount, color: '#7C3AED' },
    { name: 'Related', count: relatedCount, color: '#10B981' },
    { name: 'Roadmap', count: 5, color: '#F59E0B' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm transition-all duration-200">
      {/* Header Row: Topic Title, Difficulty Badge, and Save Topic Button (FR-15, FR-29) */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <span>Study Resources For</span>
            <span>•</span>
            <span className="text-blue-600">Verified Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {topic}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Difficulty Badge */}
          <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border ${badge.bg}`}>
            <span className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`}></span>
            <span>{badge.label}</span>
          </div>

          {/* FR-29: "Save Topic" control that changes to "Saved" after saving */}
          <button
            id="save-topic-control-btn"
            onClick={onToggleSave}
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm ${
              isSaved
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 active:scale-95'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-white stroke-[2.5]" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-slate-600" />
                <span>Save Topic</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Summary Stats Row - FR-16 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
        {/* Stat 1: Difficulty */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-500">Difficulty</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-lg font-bold text-slate-900">{difficulty}</p>
        </div>

        {/* Stat 2: Number of Concepts */}
        <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-blue-600">Key Concepts</span>
            <Layers className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-lg font-bold text-blue-900">{conceptCount} Modules</p>
        </div>

        {/* Stat 3: Number of Questions */}
        <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-purple-600">Practice Qs</span>
            <HelpCircle className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-lg font-bold text-purple-900">{questionCount} Questions</p>
        </div>

        {/* Stat 4: Related Topics */}
        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-emerald-600">Related Tracks</span>
            <GitFork className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-lg font-bold text-emerald-900">{relatedCount} Topics</p>
        </div>
      </div>

      {/* Visual Analytics bar (Recharts) */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-slate-700">Curriculum Density Breakdown:</span>
        </div>
        <div className="w-full sm:w-64 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statsChartData} layout="vertical" barSize={8}>
              <XAxis type="number" hide />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded shadow">
                        {data.name}: {data.count} items
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {statsChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
