import React from 'react';
import { AlertTriangle, RotateCcw, Home, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ErrorMessage({
  message = "We couldn't generate resources right now. Please try again.",
  onRetry,
}) {
  return (
    <div className="w-full max-w-xl mx-auto my-12 p-8 bg-white rounded-3xl border border-red-100 shadow-xl shadow-red-500/5 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 text-red-500 mx-auto flex items-center justify-center mb-5 shadow-sm">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        Unable to Load Resources
      </h3>

      <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-md mx-auto">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}

        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400">
        Tip: Try common academic topics like <span className="text-blue-600 font-medium">"Python Inheritance"</span>, <span className="text-blue-600 font-medium">"DBMS Normalization"</span>, or <span className="text-blue-600 font-medium">"Photosynthesis"</span>.
      </div>
    </div>
  );
}
