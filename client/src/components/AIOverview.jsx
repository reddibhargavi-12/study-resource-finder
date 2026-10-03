import React, { useState } from 'react';
import { BookOpen, Copy, Check, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function AIOverview({ summary = '' }) {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(summary);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden group">
      {/* Subtle background aesthetic accent */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-2xl opacity-60 pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <span>AI Overview</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <Sparkles className="w-3 h-3 mr-1 text-blue-500" /> Plain Explanation
              </span>
            </h2>
            <p className="text-xs text-slate-400">Core academic synthesis designed for fast comprehension</p>
          </div>
        </div>

        {/* Action Controls: Listen & Copy */}
        <div className="flex items-center space-x-2">
          {'speechSynthesis' in window && (
            <button
              onClick={handleSpeak}
              title={isSpeaking ? 'Stop listening' : 'Listen to explanation'}
              className={`p-2 rounded-xl text-xs font-medium border transition-colors ${
                isSpeaking
                  ? 'bg-blue-600 text-white border-blue-600 animate-pulse'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}

          <button
            onClick={handleCopy}
            title="Copy summary"
            className="p-2 rounded-xl text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main explanation content */}
      <div className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal bg-slate-50/60 rounded-2xl p-5 border border-slate-100">
        {summary || 'No overview available for this topic.'}
      </div>
    </section>
  );
}
