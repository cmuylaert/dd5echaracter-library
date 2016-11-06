import React from 'react';
import CharDetailsContainer from './../containers/CharDetailsContainer'

class CharacterPage extends React.Component {
  logout = () => {
    auth.logout();
    browserHistory.push('/login');
  }
  render(){
    return (
      <div className="app">
        <header>
          <div className="title">5E Character Library</div>
          <a className="logout" href="#" onClick={this.logout}>Logout</a>
        </header>
        <div className="app-container">
          <CharDetailsContainer id={this.props.params.characterId} character={null}/>
        </div>
      </div>

    )
  }
}
export default CharacterPage;
