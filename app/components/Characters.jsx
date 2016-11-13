import React, { PropTypes } from 'react';

import Character from './Character';

function Characters({ data }) {
  const characters = data.characters;
  const loading = data.loading;
  const characterList = characters ? characters.map(elem =>
    <Character
      key={elem.id}
      character={elem}
    />) : null;
  return (
    <div className="container characters">
      {loading ? <div className="loader" /> : <div className="character-list">{characterList}</div> }
    </div>
  );
}
Characters.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    characters: PropTypes.array,
  }).isRequired,
};
export default Characters;
