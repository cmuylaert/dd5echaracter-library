import React from 'react';

import Character from './Character';

class Characters extends  React.Component{
  render () {
    const characters = this.props.data.characters;
    const loading = this.props.data.loading;
    const characterList= characters? characters.map(elem => <Character key={elem.id} character={elem} />): null
    return (
          <div className="container characters">
            {loading ? <div className="loader"></div> :
            <div className="character-list">{characterList}</div> }
          </div>
    )
  }
}
Characters.propTypes = {
  data: React.PropTypes.object.isRequired,
};
export default Characters;
