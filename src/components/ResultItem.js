import React, { useState } from 'react';

const ResultItem = ({ character }) => {
  const [expand, setExpand] = useState(false);

  function handleClick(e) {
    setExpand(!expand);
  }

  return (
    <article className="item" role="button" onClick={handleClick}>
      <h1>{character.name}</h1>
      {expand && (
        <div>
          {character.height && <div>Height: {character.height}</div>}
          {character.mass && <div>Mass: {character.mass}</div>}
          {character.hair_color && <div>Hair: {character.hair_color}</div>}
          {character.skin_color && <div>Skin: {character.skin_color}</div>}
          {character.eye_color && <div>Eyes: {character.eye_color}</div>}
          {character.birth_year && (
            <div>Birth year: {character.birth_year}</div>
          )}
          {character.gender && <div>Gender: {character.gender}</div>}
        </div>
      )}
    </article>
  );
};

export default ResultItem;
