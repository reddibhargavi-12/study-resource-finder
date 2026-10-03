import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchTopic } from '../services/api';
import { useAuth } from '../context/AuthContext';

import SearchBar from '../components/SearchBar';
import StatsBar from '../components/StatsBar';
import AIOverview from '../components/AIOverview';
import KeyConcepts from '../components/KeyConcepts';
import ImportantPoints from '../components/ImportantPoints';
import ExampleSection from '../components/ExampleSection';
import PracticeQuestions from '../components/PracticeQuestions';
import RelatedTopics from '../components/RelatedTopics';
import LearningPath from '../components/LearningPath';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParam = searchParams.get('q') || '';

  const { addRecentSearch, toggleFavorite, isFavorite } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  // Execute search when query parameter changes
  useEffect(() => {
    if (!queryParam || !queryParam.trim()) {
      // If no query parameter in URL, default to a classic educational demo topic
      navigate('/search?q=Python%20Inheritance', { replace: true });
      return;
    }

    const fetchResources = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await searchTopic(queryParam.trim());
        setResults(data);
        // FR-26: Store successful searches in localStorage under recentSearches
        addRecentSearch(data.topic || queryParam.trim());
      } catch (err) {
        setError(err.message || "We couldn't generate resources right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [queryParam]);

  // Handler for searching a new topic from top search bar
  const handleNewSearch = (newTopic) => {
    if (!newTopic || !newTopic.trim()) return;
    setSearchParams({ q: newTopic.trim() });
  };

  // FR-23 & Section 12.2: Clicking a related topic automatically runs a new search
  const handleSelectRelatedTopic = (topicName) => {
    setSearchParams({ q: topicName.trim() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSave = () => {
    if (results?.topic) {
      toggleFavorite(results.topic);
    }
  };

  const isCurrentTopicSaved = results ? isFavorite(results.topic) : false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Search Bar for seamless topic switching */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        <SearchBar
          initialValue={queryParam}
          onSearch={handleNewSearch}
          isLoading={loading}
          placeholder="Refine search or explore another academic topic..."
        />
      </div>

      {/* Loading State - FR-05 */}
      {loading && <Loading />}

      {/* Error State - FR-13, Section 13 */}
      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={() => {
            if (queryParam) handleNewSearch(queryParam);
          }}
        />
      )}

      {/* Results Dashboard - FR-15 to FR-25 */}
      {!loading && !error && results && (
        <div className="space-y-8 animate-fadeIn">
          {/* Stats Bar & Header (FR-15, FR-16, FR-29) */}
          <StatsBar
            topic={results.topic}
            difficulty={results.difficulty}
            conceptCount={results.keyConcepts?.length || 0}
            questionCount={results.practiceQuestions?.length || 0}
            relatedCount={results.relatedTopics?.length || 0}
            isSaved={isCurrentTopicSaved}
            onToggleSave={handleToggleSave}
          />

          {/* Section 1: AI Overview (FR-17) */}
          <AIOverview summary={results.summary} />

          {/* Section 2: Key Concepts (FR-18) */}
          <KeyConcepts keyConcepts={results.keyConcepts} />

          {/* Section 3: Important Points (FR-19) */}
          <ImportantPoints importantPoints={results.importantPoints} />

          {/* Section 4: Example Section (FR-20) */}
          <ExampleSection example={results.example} />

          {/* Section 5: Practice Questions (FR-21) */}
          <PracticeQuestions practiceQuestions={results.practiceQuestions} />

          {/* Section 6: Related Topics (FR-22, FR-23) */}
          <RelatedTopics
            relatedTopics={results.relatedTopics}
            onSelectTopic={handleSelectRelatedTopic}
          />

          {/* Section 7: Learning Path (FR-24) */}
          <LearningPath
            learningPath={results.learningPath}
            topic={results.topic}
          />
        </div>
      )}
    </div>
  );
}
