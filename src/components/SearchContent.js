import React from 'react';
import Results from './Results';
import History from './History';
import './Searchcontent.css';

const SearchContent = ({
  results,
  history,
  setResults,
  clearHistory,
  removeHistoryItem
}) => (
  <div className="content">
    <Results results={results} />
    <History
      history={history}
      setResults={setResults}
      clearHistory={clearHistory}
      removeHistoryItem={removeHistoryItem}
    />
  </div>
);

export default SearchContent;
