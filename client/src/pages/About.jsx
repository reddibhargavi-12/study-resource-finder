import React from 'react';
import {
  BookOpen,
  Sparkles,
  Layers,
  ShieldCheck,
  Cpu,
  Database,
  Globe,
  Zap,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>SRS Document & Technical Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          About Study Resource Finder
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          An AI-powered academic discovery platform designed to convert any syllabus concept into an organized, student-friendly study dashboard.
        </p>
      </div>

      {/* Author & Academic Credential Card (from SRS Title Page) */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-wider text-blue-300 font-bold">Academic Project Specification</span>
            <h2 className="text-2xl font-bold mt-1">Study Resource Finder (SRS v1.0)</h2>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Verified Production Ready
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-sm">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Author / Lead</span>
            <span className="font-semibold text-white text-base">Reddi Bhargavi</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-1">Hall Ticket / Roll No</span>
            <span className="font-semibold text-white text-base">24B61A05C9</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-1">Department</span>
            <span className="font-semibold text-white text-base">Computer Science & Engineering</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-1">Institute</span>
            <span className="font-semibold text-white text-base">SITAM</span>
          </div>
        </div>
      </div>

      {/* Section 1: Objective & Problem Statement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            !
          </div>
          <h3 className="text-xl font-bold text-slate-900">The Problem</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Students frequently struggle to synthesize academic material across disparate websites. They require concise definitions, concrete code snippets, high-yield bullet points, self-testing questions, and ordered learning tracks, but scattered web resources cause friction and inconsistent depth.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            ✓
          </div>
          <h3 className="text-xl font-bold text-slate-900">The Solution</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Study Resource Finder accepts any free-text academic topic and generates a comprehensive, 7-pillar study dashboard via Google Gemini. All per-student data lives privately in client browser localStorage, creating a lightweight, zero-cost, high-speed study assistant.
          </p>
        </div>
      </div>

      {/* 3-Tier Architecture Visualization (SRS Section 3.1 & Figure 1) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">System Architecture (3-Tier Design)</h3>
            <p className="text-xs text-slate-400">Strict separation of presentation, application proxy, and AI tiers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Tier 1: Presentation</span>
            <h4 className="font-bold text-slate-900 text-base">React.js + Vite</h4>
            <p className="text-xs text-slate-600">
              Interactive Single-Page Application (SPA) with responsive Tailwind styling, Recharts analytics, and localStorage persistence.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Tier 2: Application</span>
            <h4 className="font-bold text-slate-900 text-base">Node.js + Express</h4>
            <p className="text-xs text-slate-600">
              RESTful proxy exposing <code className="font-mono text-[11px] bg-indigo-100 px-1 py-0.5 rounded">GET /api/search?q=topic</code>. Validates input and shields secret API keys.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-violet-50/60 border border-violet-100 space-y-2">
            <span className="text-xs font-bold text-violet-700 uppercase tracking-wider">Tier 3: Intelligence</span>
            <h4 className="font-bold text-slate-900 text-base">Google Gemini API</h4>
            <p className="text-xs text-slate-600">
              Generates strictly structured JSON schemas including overview, key concepts, bullet takeaways, examples, quizzes, and roadmaps.
            </p>
          </div>
        </div>
      </div>

      {/* 5 Core Features Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900">
          5 Core Functional Pillars (SRS Section 7 & Table 17)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-blue-600">Feature 1</span>
            <h4 className="font-bold text-sm text-slate-900">Search & Input Validation</h4>
            <p className="text-xs text-slate-500">
              Free-text query input with live client validation, empty input checks, and animated skeleton loading states.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-indigo-600">Feature 2</span>
            <h4 className="font-bold text-sm text-slate-900">AI Resource Generation</h4>
            <p className="text-xs text-slate-500">
              Backend Gemini proxy with strict JSON schema parsing and resilient zero-key fallback synthesis.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-purple-600">Feature 3</span>
            <h4 className="font-bold text-sm text-slate-900">7-Pillar Results Dashboard</h4>
            <p className="text-xs text-slate-500">
              AI overview, key concept cards, concise bullets, syntax-highlighted code, questions, chips, and roadmap.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-emerald-600">Feature 4</span>
            <h4 className="font-bold text-sm text-slate-900">History & Favourites Management</h4>
            <p className="text-xs text-slate-500">
              Browser localStorage synchronization for recent searches, repeat search clicks, and topic bookmarking.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-amber-600">Feature 5</span>
            <h4 className="font-bold text-sm text-slate-900">Navigation & UI System</h4>
            <p className="text-xs text-slate-500">
              Accessible navigation bar, responsive layouts from 360px mobile to 4K desktop, and WCAG compliance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-slate-600">Security & Architecture</span>
            <h4 className="font-bold text-sm text-slate-900">Zero Credential Exposure</h4>
            <p className="text-xs text-slate-500">
              No API keys or stack traces leaked to client. Safe error handling under all network conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
