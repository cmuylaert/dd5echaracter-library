import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import auth from './../auth';
import CharDetailsContainer from './../containers/CharDetailsContainer';

class CharacterSheet extends React.Component {
  logout = () => {
    auth.logout();
    browserHistory.push('/login');
  };
  render() {
    return (
      <div className="app">
        <header>
          <div className="title">5E Character Library</div>
          <a className="logout" href="#logout" onClick={this.logout}>Logout</a>
        </header>
        <div className="app-container">
          <CharDetailsContainer id={this.props.params.characterId} character={null} />
        </div>
      </div>

    );
  }
}
CharacterSheet.propTypes = {
  params: PropTypes.shape({
    characterId: PropTypes.string.isRequired,
  }).isRequired,
};
export default CharacterSheet;
