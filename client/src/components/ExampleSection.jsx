import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, FileText } from 'lucide-react';

export default function ExampleSection({ example = '' }) {
  const [copied, setCopied] = useState(false);

  if (!example) return null;

  // Determine whether it looks like programming code or text description
  const isCode =
    example.includes('def ') ||
    example.includes('class ') ||
    example.includes('function ') ||
    example.includes('console.log') ||
    example.includes('CREATE TABLE') ||
    example.includes('SELECT ') ||
    example.includes('import ') ||
    example.includes('{') ||
    example.includes('->') ||
    example.includes('public class') ||
    example.includes('//') ||
    example.includes('#');

  const handleCopy = () => {
    navigator.clipboard.writeText(example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-sm">
            {isCode ? <Code2 className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <span>{isCode ? 'Code Implementation & Example' : 'Illustrative Example'}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                {isCode ? 'Executable Code' : 'Case Scenario'}
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {isCode ? 'Hands-on programming demonstration with syntax patterns' : 'Real-world manifestation and practical walkthrough'}
            </p>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          title="Copy example to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Block / Example Content - FR-20 */}
      {isCode ? (
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0F172A] text-slate-100 shadow-lg">
          {/* Terminal / Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#1E293B] border-b border-slate-700/60 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-mono text-[11px] text-slate-400">example.py / script.js</span>
            </div>
            <div className="flex items-center space-x-1 text-slate-400">
              <Terminal className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">monospaced</span>
            </div>
          </div>

          {/* Monospaced Formatted Code Body */}
          <div className="p-4 sm:p-5 overflow-x-auto font-mono text-sm leading-relaxed text-emerald-300">
            <pre className="selection:bg-slate-700">
              <code>{example}</code>
            </pre>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl p-5 bg-slate-50 border border-slate-200 text-slate-700 text-base leading-relaxed whitespace-pre-line">
          {example}
        </div>
      )}
    </section>
  );
}
