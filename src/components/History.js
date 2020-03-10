import React from 'react';
import { apiReq } from '../utils';

const History = ({ history, setResults, clearHistory, removeHistoryItem }) => {
  //If user clicks a history item, the search will trigger
  function handleClick(key) {
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
  }

  return (
    <section className="history-wrapper">
      <div className="history-header">
        <h2>Search history</h2>
        <button onClick={clearHistory}>Clear history</button>
      </div>
      <ul className="">
        {history &&
          history.map((item, idx) => (
            <li className="item" key={idx}>
              <div
                className="history-item"
                onClick={() => handleClick(item.searchKey)}
                role="button"
              >
                <div className="history-item-header">
                  <div className="searchkey">"{item.searchKey}"</div>
                </div>
                <div className="discrete">{item.timeStamp}</div>
              </div>
              <button
                className="close-btn"
                onClick={() => removeHistoryItem(item.timeStamp)}
              >
                X
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default History;
