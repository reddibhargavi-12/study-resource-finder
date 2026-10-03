import React, { useState } from 'react';
import { Search, Sparkles, X, ArrowRight } from 'lucide-react';

export default function SearchBar({
  initialValue = '',
  onSearch,
  isLoading = false,
  placeholder = 'Search any academic topic (e.g., Python Inheritance, DBMS Normalization, Photosynthesis)...',
  large = false,
}) {
  const [query, setQuery] = useState(initialValue);
  const [validationError, setValidationError] = useState('');

  // Synchronize when initialValue changes (e.g. from related topics or recent searches)
  React.useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    // FR-04: Validate topic is not empty
    if (!query || !query.trim()) {
      setValidationError('Please enter a topic to search.');
      return;
    }

    setValidationError('');
    onSearch(query.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleClear = () => {
    setQuery('');
    setValidationError('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          {/* Leading search icon */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className={large ? "w-6 h-6 text-blue-600" : "w-5 h-5 text-slate-400"} />
          </div>

          {/* Search Input */}
          <input
            id="academic-topic-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (validationError) setValidationError('');
            }}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder={placeholder}
            aria-label="Academic topic search input"
            className={`w-full rounded-2xl border transition-all duration-200 outline-none ${
              validationError
                ? 'border-red-400 ring-2 ring-red-100 bg-red-50/20'
                : 'border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 bg-white'
            } ${
              large
                ? 'pl-13 pr-12 py-4 text-base sm:text-lg shadow-lg shadow-blue-500/5'
                : 'pl-11 pr-10 py-3 text-sm sm:text-base shadow-sm'
            }`}
          />

          {/* Clear button if text exists */}
          {query && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              title="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Resources Button - FR-03, FR-33 */}
        <button
          id="search-resources-btn"
          type="submit"
          disabled={isLoading}
          className={`w-full sm:w-auto inline-flex items-center justify-center font-semibold text-white transition-all duration-200 shadow-md ${
            isLoading
              ? 'bg-blue-400 cursor-not-allowed opacity-90'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]'
          } ${
            large
              ? 'px-7 py-4 rounded-2xl text-base'
              : 'px-5 py-3 rounded-xl text-sm'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Search Resources</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </button>
      </form>

      {/* Validation Error Message - FR-04 */}
      {validationError && (
        <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-center space-x-1.5 animate-fadeIn">
          <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{validationError}</span>
        </div>
      )}
    </div>
  );
}
