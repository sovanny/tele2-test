import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchContent from './components/SearchContent';
import './App.css';

const App = () => {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('searchHistory')) || []
  );
  const [results, setResults] = useState();

  //Add searches to search history, and persist with local storage
  useEffect(() => {
    if (results) {
      let newHistory = [
        {
          searchKey: results.searchKey,
          timeStamp: new Date().toLocaleString()
        },
        ...history
      ];
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      setHistory(newHistory);
    }
  }, [results]);

  function clearHistory() {
    localStorage.removeItem('searchHistory');
    setHistory([]);
  }

  function removeHistoryItem(ts) {
    let newHistory = history.filter(item => item.timeStamp !== ts);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    setHistory(newHistory);
  }

  return (
    <div className="app">
      <Header setResults={setResults} />
      <main className="content-wrapper">
        <SearchContent
          results={results}
          history={history}
          setResults={setResults}
          clearHistory={clearHistory}
          removeHistoryItem={removeHistoryItem}
        />
      </main>
      <footer className="footer" />
    </div>
  );
};

export default App;
