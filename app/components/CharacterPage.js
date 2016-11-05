import React from 'react';
import CharDetailsContainer from './../containers/CharDetailsContainer'

class CharacterPage extends React.Component {
  render(){
    return (
      <div className="app">
        <header>
          <div className="title">5E Character Library</div>
        </header>
        <div className="app-container">
          <CharDetailsContainer id={this.props.params.characterId} />
        </div>
      </div>

    )
  }
}
export default CharacterPage;
