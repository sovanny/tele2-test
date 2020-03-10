import React, { useState, useEffect } from 'react';
import ResultItem from './ResultItem';

const Results = ({ results }) => (
  <section className="results-wrapper">
    {results ? (
      <>
        <h2>
          Search results for{' '}
          <span className="searchkey">{results.searchKey}</span>
        </h2>
        {results.loading && <div>Loading..</div>}
        <ul>
          {results.results.map((item, idx) => (
            <li key={idx}>
              <ResultItem character={item} />
            </li>
          ))}
        </ul>
      </>
    ) : (
      <>
        <h2>Search results</h2>
        <div>Search for a character</div>
      </>
    )}
  </section>
);

export default Results;
