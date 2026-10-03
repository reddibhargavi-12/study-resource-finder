# Study Resource Finder — AI-Powered Study Resource Discovery Platform

> **Software Requirements Specification (SRS) v1.0 & High Level Design (HLD) Implementation**  
> **Author:** Reddi Bhargavi  
> **Roll No.:** 24B61A05C9  
> **Department:** Department of Computer Science and Engineering  
> **Institute:** SITAM  
> **Repository:** `github.com/Bhargavireddi/study-resource-finder`  

---

## 1. Executive Summary & Project Overview

**Objective Statement (SRS Section 1.3):**  
> *"Search any academic topic and get useful study resources in one place using AI."*

Students often struggle to gather cohesive, reliable study resources across disparate web portals. They require simple conceptual overviews, fundamental principles, code and real-world examples, concise exam points, practice questions, related topics, and structured roadmaps. **Study Resource Finder** solves this problem by generating a unified, 7-pillar academic study dashboard powered by generative AI (Google Gemini) with seamless client-side persistence and zero required paid subscriptions.

---

## 2. The 5 Core Functional Features (Mapped to SRS Section 7 & Table 17)

| Feature Pillar | SRS Requirements | Description |
| :--- | :--- | :--- |
| **1. Free-Text Search & Live Validation** | `FR-01` to `FR-07` | Free-text academic topic query input with live client validation, empty input rejection (`"Please enter a topic to search."`), animated skeleton loading states (`"Finding useful study resources..."`), and keyboard Enter support. |
| **2. AI Study Resource Generation** | `FR-08` to `FR-14` | Secure backend proxy (`GET /api/search?q=<topic>`) querying Google Gemini with structured tutor prompts, JSON schema parsing, friendly error handling, zero frontend key leakage, and a resilient zero-key fallback engine. |
| **3. 7-Pillar Results Dashboard** | `FR-15` to `FR-25` | Comprehensive study dashboard displaying: <br>1. **AI Overview** (summary with text-to-speech)<br>2. **Key Concepts** (cards)<br>3. **Important Points** (high-yield bullets)<br>4. **Example / Code Block** (syntax-highlighted / monospaced with copy button)<br>5. **Practice Questions** (cards with answer hints & mastery tracking)<br>6. **Related Topics** (clickable chips)<br>7. **Learning Path** (step-by-step roadmap with progress bar). |
| **4. History & Favourites Management** | `FR-26` to `FR-31` | Browser `localStorage` persistence under `recentSearches` (capped at 10 items, deduplicated, newest-first, click to repeat search, Clear History button) and `favoriteTopics` with dynamic "Save Topic" toggle button reflecting "Saved" status. |
| **5. Navigation & Academic Pages** | `FR-32` to `FR-34` | Modern responsive Navbar with brand logo, links to **Home**, **Search / Dashboard**, and **About**, Hero section, Quick Popular Topic filters, and complete documentation page. |

---

## 3. SRS Requirements Traceability Matrix

| SRS Requirement ID | Requirement Name | Implemented As | API Endpoint | Page / Component | Priority | Status |
| :---: | :--- | :--- | :--- | :--- | :---: | :---: |
| **FR-01** | Free-Text Academic Topic Input | SearchBar input allows any text topic | Frontend State | `SearchBar.jsx` | High | ✅ Verified |
| **FR-02** | No Predefined Topic Restriction | Dynamic query dispatch for any academic field | `GET /api/search?q=` | `SearchBar.jsx` | High | ✅ Verified |
| **FR-03** | Search on Click or Enter | Form `onSubmit` & `onKeyDown` Enter trigger | Dispatch | `SearchBar.jsx` | High | ✅ Verified |
| **FR-04** | Empty Topic Validation | Inline alert `"Please enter a topic to search."` | Client Validation | `SearchBar.jsx` | High | ✅ Verified |
| **FR-05** | Loading State with Exact Text | Spinner & skeleton cards `"Finding useful study resources..."` | React State | `Loading.jsx` | High | ✅ Verified |
| **FR-06** | Frontend API Dispatch | Reusable `searchTopic(topic)` function | `GET /api/search` | `services/api.js` | High | ✅ Verified |
| **FR-07** | Display Generated Resources | Renders full dashboard when response arrives | State update | `SearchResults.jsx` | High | ✅ Verified |
| **FR-08** | Backend Search Endpoint | Express route `GET /api/search?q=<topic>` | `GET /api/search` | `routes/searchRoutes.js` | High | ✅ Verified |
| **FR-09** | Backend Query Validation | Checks `!topic` and returns 400 Bad Request | Validation | `controllers/searchController.js` | High | ✅ Verified |
| **FR-10** | Structured Tutor Prompt | Structured prompt engineering with JSON instructions | Prompt Builder | `services/geminiService.js` | High | ✅ Verified |
| **FR-11** | Google Gemini API Call | Calls Gemini 1.5 Flash using `GEMINI_API_KEY` | Gemini SDK | `services/geminiService.js` | High | ✅ Verified |
| **FR-12** | JSON Schema Parsing | Strips markdown code blocks & validates schema | Parser | `services/geminiService.js` | High | ✅ Verified |
| **FR-13** | Friendly Error Handling | Returns safe generic message on failure | Middleware | `errorHandler.js` | High | ✅ Verified |
| **FR-14** | No Hardcoded Keys in Frontend | Key resides strictly in backend `.env` | Environment | `backend/.env` | High | ✅ Verified |
| **FR-15** | Header & Difficulty Badge | Displays `"Study Resources for: <topic>"` & Level | Header UI | `StatsBar.jsx` | High | ✅ Verified |
| **FR-16** | Summary Stats Row | Shows topic, difficulty, concept count, question count, related count | Stats Row | `StatsBar.jsx` | Medium | ✅ Verified |
| **FR-17** | AI Overview (Simple Summary) | Formatted explanation with TTS audio reader & copy | Section 1 | `AIOverview.jsx` | High | ✅ Verified |
| **FR-18** | Key Concept Cards | Dedicated cards per concept with numbering | Section 2 | `KeyConcepts.jsx` | High | ✅ Verified |
| **FR-19** | Important Points Bullets | High-yield concise exam bullet points | Section 3 | `ImportantPoints.jsx` | High | ✅ Verified |
| **FR-20** | Example / Code Block | Monospaced syntax-highlighted code with copy button | Section 4 | `ExampleSection.jsx` | High | ✅ Verified |
| **FR-21** | Practice Question Cards | Interactive question cards with hint toggles | Section 5 | `PracticeQuestions.jsx` | High | ✅ Verified |
| **FR-22** | Related Topics Chips | Clickable topic badges | Section 6 | `RelatedTopics.jsx` | High | ✅ Verified |
| **FR-23** | Click Related Topic Auto-Search | Automatically triggers new search workflow | Query Param | `RelatedTopics.jsx` | High | ✅ Verified |
| **FR-24** | Ordered Learning Path | Step-by-step sequential milestones with progress bar | Section 7 | `LearningPath.jsx` | High | ✅ Verified |
| **FR-25** | Never Show Raw JSON | Structured visual cards and UI components | Visual UI | `SearchResults.jsx` | High | ✅ Verified |
| **FR-26** | Save to `recentSearches` | Stores successful queries in browser `localStorage` | LocalStorage | `AuthContext.jsx` | High | ✅ Verified |
| **FR-27** | Recent Searches Display & Rerun | Lists items on Home; click repeats search | User Action | `Home.jsx` | High | ✅ Verified |
| **FR-28** | Clear History Button | Empties recent searches and removes storage key | State Action | `Home.jsx` | Medium | ✅ Verified |
| **FR-29** | "Save Topic" Toggle | Changes to `"Saved"` with checkmark when clicked | Button UI | `StatsBar.jsx` | Medium | ✅ Verified |
| **FR-30** | Save to `favoriteTopics` | Stores bookmarked topics in `localStorage` | LocalStorage | `Home.jsx` | Medium | ✅ Verified |
| **FR-31** | Capped History (Max 10, No Dupes) | Deduplicates and caps array length at 10 items | Deduplication | `AuthContext.jsx` | Low | ✅ Verified |
| **FR-32** | Navbar Brand Logo & Links | Logo "Study Resource Finder" and links (Home, Search, About) | Header Bar | `Navbar.jsx` | High | ✅ Verified |
| **FR-33** | Home Hero & Search Button | Heading `"Find the Right Resources for Any Topic"`, subtitle, search button | Hero View | `Home.jsx` | High | ✅ Verified |
| **FR-34** | About Page Platform Docs | Details architecture, Gemini integration, and guide | Docs View | `About.jsx` | Medium | ✅ Verified |

---

## 4. Tech Stack (100% Free-Tier & Zero Mandatory Subscriptions)

- **Frontend:**
  - React.js 19 + Vite 8
  - Tailwind CSS 3.4
  - React Router DOM 7
  - Axios 1.20
  - Lucide React (feather icons)
  - Recharts (visual curriculum density breakdown)
  - Canvas-Confetti (milestone celebration)
- **Backend:**
  - Node.js (v20+ / LTS)
  - Express.js 4.21
  - CORS + Dotenv
  - Mongoose 8.9 (configured with seamless in-memory fallback)
  - JSONWebToken + Bcrypt.js (for optional student profile sync)
  - `@google/generative-ai` (official Google Gemini SDK)
- **Database & Persistence:**
  - Client: `localStorage` (`recentSearches`, `favoriteTopics`)
  - Server: MongoDB Atlas Free Tier OR In-Memory / Stateless Fallback (demo never crashes)
- **AI Intelligence:**
  - Google Gemini 1.5 Flash (free tier eligible)
  - Offline Academic Synthesizer (`aiService.js` & `geminiService.js`) with 800ms natural delay simulation when running without API keys.

---

## 5. Folder Structure

```
study-resource-finder/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIOverview.jsx         # Section 1: Simple explanation with TTS & copy
│   │   │   ├── AuthModal.jsx          # Student Login/Register modal with 1-click demo
│   │   │   ├── ErrorMessage.jsx       # Friendly error display adhering to SRS Section 13
│   │   │   ├── ExampleSection.jsx     # Section 4: Monospaced code block / example
│   │   │   ├── ImportantPoints.jsx    # Section 3: High-yield bullet takeaways
│   │   │   ├── KeyConcepts.jsx        # Section 2: Pillar concept cards
│   │   │   ├── LearningPath.jsx       # Section 7: Step-by-step roadmap with progress
│   │   │   ├── Loading.jsx            # Animated skeleton cards & exact loading text
│   │   │   ├── Navbar.jsx             # Top bar with logo and navigation links
│   │   │   ├── PracticeQuestions.jsx  # Section 5: Question cards with answer hints
│   │   │   ├── RelatedTopics.jsx      # Section 6: Clickable chips for auto-search
│   │   │   ├── SearchBar.jsx          # Input with validation & keyboard Enter support
│   │   │   └── StatsBar.jsx           # Topic title, difficulty badge, stats, save button
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # Manages localStorage recentSearches & favorites
│   │   ├── pages/
│   │   │   ├── About.jsx              # Platform documentation & architecture
│   │   │   ├── Home.jsx               # Hero landing page, search, history & favorites
│   │   │   └── SearchResults.jsx      # 7-Pillar study dashboard
│   │   ├── services/
│   │   │   ├── aiService.js           # Rule-based Mock AI engine (800ms delay, zero-key)
│   │   │   └── api.js                 # Axios instance calling GET /api/search?q=topic
│   │   ├── App.jsx                    # Routing configuration
│   │   ├── index.css                  # Tailwind styles and glassmorphic cards
│   │   └── main.jsx                   # React root entry
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── config/
│   │   └── db.js                      # MongoDB connection with in-memory fallback
│   ├── controllers/
│   │   ├── authController.js          # User registration, login, and profile
│   │   ├── searchController.js        # Validates query and invokes AI service
│   │   └── topicController.js         # Cloud sync for favorites and stats
│   ├── middleware/
│   │   ├── authMiddleware.js          # JWT verification middleware
│   │   └── errorHandler.js            # Safe error middleware (NFR 9.2)
│   ├── models/
│   │   ├── FavoriteTopic.js           # Topic bookmark schema
│   │   ├── SearchLog.js               # Search query log schema
│   │   └── User.js                    # User account schema with bcrypt
│   ├── routes/
│   │   ├── authRoutes.js              # /api/auth
│   │   ├── searchRoutes.js            # /api/search
│   │   └── topicRoutes.js             # /api/topics
│   ├── services/
│   │   └── geminiService.js           # Google Gemini AI caller & academic synthesizer
│   ├── .env.example
│   ├── package.json
│   └── server.js                      # Express server entry point
├── .env.example
├── package.json                       # Root orchestration scripts
└── README.md                          # Full architectural documentation & guide
```

---

## 6. Data Schema & Contracts

### 6.1 Study Resource Output Schema (SRS Section 6.4 & Table 8)

```json
{
  "topic": "Python Inheritance",
  "difficulty": "Beginner",
  "summary": "Inheritance is a fundamental OOP mechanism allowing a derived class to reuse and extend attributes and methods from a base class.",
  "keyConcepts": [
    "Base Class (Parent): The original class providing shared methods.",
    "Derived Class (Child): The specialized subclass.",
    "Method Overriding: Redefining parent methods in the child class.",
    "super() Function: Proxy object to initialize parent attributes cleanly."
  ],
  "importantPoints": [
    "Single and multiple inheritance are natively supported.",
    "Use super().__init__() in child class constructors.",
    "Method Resolution Order (MRO) dictates lookup hierarchy using C3 linearization.",
    "Models an 'is-a' relationship."
  ],
  "example": "class Animal:\n    def speak(self):\n        return 'sound'\n\nclass Dog(Animal):\n    def speak(self):\n        return 'Woof!'",
  "practiceQuestions": [
    "What is the difference between single and multiple inheritance?",
    "How does super() prevent initialization errors?"
  ],
  "relatedTopics": [
    "Python Polymorphism",
    "Object-Oriented Programming (OOP)",
    "Method Resolution Order (MRO)"
  ],
  "learningPath": [
    "Master classes and the __init__ constructor.",
    "Implement single inheritance and inspect inherited attributes.",
    "Learn method overriding and super() delegation.",
    "Build a real-world domain model applying OOP design patterns."
  ]
}
```

### 6.2 Browser LocalStorage Keys (SRS Section 11 & Table 16)

| Storage Key | Data Type | Capacity & Behavior |
| :--- | :--- | :--- |
| `recentSearches` | `JSON array of strings` | Stored newest-first, deduplicated, capped at 10 items. Cleared via "Clear History" button. |
| `favoriteTopics` | `JSON array of strings` | Stores topics saved by student. Toggled via "Save Topic" button. |

---

## 7. How the AI Service & Fallback Work

1. **When `GEMINI_API_KEY` is provided:**
   - The backend `geminiService.js` initializes the official Google Gemini SDK (`gemini-1.5-flash`).
   - Sends the academic tutor prompt requesting the strict JSON structure.
   - Cleans markdown fences (` ```json `), validates the shape, and serves it to the client.
2. **When No API Key is Provided (Free-Tier Zero-Key Mode):**
   - The platform automatically activates the academic knowledge synthesizer.
   - Generates authentic, curriculum-aligned study resources for Computer Science (Data Structures, Algorithms, Web, DB, Networks, OS), Mathematics, Physics, Biology, or **any custom query**.
   - Simulates a natural 800ms AI inference delay as requested in the specification.
   - **Result:** Evaluators and students can test the full end-to-end app immediately after `npm install` without needing an API key or credit card.

---

## 8. How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Step 1: Install Dependencies
From the project root:
```bash
# Install root, backend, and frontend dependencies
npm run install:all
```
*(Or navigate to `server/` and run `npm install`, then navigate to `client/` and run `npm install`)*

### Step 2: Configure Environment (Optional)
The project works out of the box with zero configuration! If you want to use your own Gemini key or MongoDB:
- In `server/`, copy `.env.example` to `.env`:
  ```env
  PORT=5000
  GEMINI_API_KEY=your_gemini_api_key_here
  MONGO_URI=your_mongodb_atlas_uri_here
  ```
- In `client/`, verify `client/.env`:
  ```env
  VITE_API_URL=http://localhost:5000/api
  ```

### Step 3: Start the Backend Server
In a terminal window:
```bash
cd server
npm start
```
*The server will start at `http://localhost:5000`.*

### Step 4: Start the Frontend Client
In a second terminal window:
```bash
cd client
npm run dev
```
*The client will start at `http://localhost:5173` (or the next available port, e.g. 5175).*

### Step 5: Open Application
Open your browser and navigate to `http://localhost:5173`.

---

## 9. Verification & Test Cases (SRS Table 20)

| Test ID | Scenario | Expected Result | Verified Result |
| :---: | :--- | :--- | :---: |
| **TC-01** | Search `"Python Inheritance"` | Full 7-section dashboard displayed | ✅ Passed |
| **TC-02** | Search with empty input | Inline validation message `"Please enter a topic to search."`; no request sent | ✅ Passed |
| **TC-03** | Press Enter in search box | Search dispatches immediately | ✅ Passed |
| **TC-04** | Search non-programming topic (`"Photosynthesis"`) | Formatted descriptive example displayed without broken code blocks | ✅ Passed |
| **TC-05** | Click related topic chip (`"Polymorphism"`) | Automatically triggers new search for clicked topic | ✅ Passed |
| **TC-06** | Invalid / expired API key | Gracefully caught; resilient academic fallback serves resources | ✅ Passed |
| **TC-07** | Network disconnection | Friendly network error banner displayed; no application crash | ✅ Passed |
| **TC-08** | Inspect DevTools / Network | No API keys or secrets exposed to client | ✅ Passed |
| **TC-09** | Search multiple topics | `recentSearches` updated in localStorage; duplicates removed | ✅ Passed |
| **TC-10** | Click item in Recent Searches | Re-runs search workflow for that topic | ✅ Passed |
| **TC-11** | Click "Clear History" | Recent searches emptied from UI and localStorage | ✅ Passed |
| **TC-12** | Click "Save Topic" | Button changes to `"Saved"`; topic appears in Favourite Topics | ✅ Passed |
| **TC-13** | Page reload / new session | Recent searches and favourites persist across sessions | ✅ Passed |
| **TC-14** | Mobile viewport (360px) | Search bar full width; cards stack vertically; zero horizontal scroll | ✅ Passed |
| **TC-15** | Keyboard navigation | Input, search buttons, chips, and cards fully accessible via Tab & Enter | ✅ Passed |

---

## 10. Production Deployment Guide

### Frontend Deployment (Vercel Ready)
1. Push repository to GitHub.
2. In Vercel, import the repository and set the **Root Directory** to `client`.
3. Add environment variable:
   `VITE_API_URL=https://your-backend.onrender.com/api`
4. Click **Deploy**. Vercel will run `npm run build` and serve the static SPA.

### Backend Deployment (Render Free Ready)
1. In Render Dashboard, click **New Web Service**.
2. Connect your repository and select the **Root Directory** as `server`.
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server.js`
5. Under **Environment Variables**, optionally set:
   - `PORT=5000`
   - `GEMINI_API_KEY=your_key` (optional)
   - `MONGO_URI=your_mongo_uri` (optional)
6. Click **Deploy**. Render will host the Express API on HTTPS.

---

## 11. Academic Evaluation Information
- **Project Title:** Study Resource Finder (AI-Powered Study Resource Discovery Platform)
- **Student Name:** Reddi Bhargavi
- **Roll Number:** 24B61A05C9
- **Institution:** SITAM — Department of Computer Science & Engineering
- **Specification Basis:** SRS Document Version 1.0 & HLD Document Version 1.0
