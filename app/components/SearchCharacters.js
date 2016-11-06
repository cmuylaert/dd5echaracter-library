import React from "react";
import CharactersContainer from './../containers/CharactersContainer';
import NewCharacterContainer from './../containers/NewCharacterContainer';
import SearchForm from './SearchForm';
import {Link, browserHistory} from 'react-router';
import auth from './../auth';

class SearchCharacters extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
          name:null
        };
  }
  onNameChange = (name) => {
    this.setState({name: name!=="" ? name : null})
  }
  logout = () => {
    auth.logout();
    browserHistory.push('/login');
  }
  render() {
    return (
      <div className="app">
        <header>
          <div className="title">5E Character Library</div>
          <SearchForm onNameChange={this.onNameChange}/>
          {auth.isLoggedIn()?<a href="#" onClick={this.logout}>Logout</a>
          : <Link to={'/login'}>Login</Link>}

        </header>
        <div className="app-container">
          <NewCharacterContainer name={null} classes={null}/>
          <CharactersContainer name={this.state.name}/>
        </div>
      </div>
    );
  }
}
export default SearchCharacters;
