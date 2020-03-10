import React, { useRef, useCallback, useState, useEffect } from 'react';
import { debounceEvent, apiReq } from '../utils';

const Searchbar = ({ setResults }) => {
  const formRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [suggestionSearchKey, setSuggestionSearchKey] = useState('');
  const [userInput, setUserInput] = useState('');

  // Debouncer prevent multiple searches when typing fast
  const debouncedSetSearchKey = useCallback(
    debounceEvent(val => {
      if (val.length > 1) {
        setSuggestionSearchKey(val);
      }
    }, 250),
    []
  );

  // click listener to remove suggestion list when clicking elsewhere
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  // update suggestion list when user has stopped typing,
  // and length is at least 2
  useEffect(() => {
    if (suggestionSearchKey.length > 1) {
      apiReq(suggestionSearchKey).then(response => {
        setSuggestions(response.data.results);
      });
    }
  }, [setSuggestions, suggestionSearchKey]);

  function handleUserInputChange(event) {
    setUserInput(event.target.value);
    debouncedSetSearchKey(event.target.value);
  }

  // Make it possible to traverse list with arrow keys
  function handleKeyDown(e) {
    if (e.keyCode === 38 && selected > 0) {
      setSelected(selected - 1);
    } else if (e.keyCode === 40 && selected < suggestions.length - 1) {
      setSelected(selected + 1);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      const key = selected === -1 ? userInput : suggestions[selected].name;
      handleSuggestionSearch(key);
    } else {
      setSelected(-1);
    }
  }

  function handleSuggestionSearch(key) {
    setResults({
      searchKey: key,
      results: [],
      loading: true
    });
    apiReq(key).then(response =>
      setResults({
        searchKey: key,
        results: response.data.results,
        loading: false
      })
    );
    setUserInput('');
    setSuggestionSearchKey('');
  }

  function handleClickOutside(event) {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  }

  return (
    <form ref={formRef} className="searchbar-wrapper" onKeyDown={handleKeyDown}>
      <input
        type="search"
        className="searchbar-input"
        onChange={handleUserInputChange}
        value={userInput}
      />

      {userInput && suggestionSearchKey && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, idx) => (
            <li
              onClick={() => handleSuggestionSearch(suggestion.name)}
              key={idx}
              className={
                idx === selected
                  ? 'suggestion-item suggestion-item-focused'
                  : 'suggestion-item'
              }
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default Searchbar;
