import React from "react";
import CharactersContainer from './../containers/CharactersContainer';
import NewCharacterContainer from './../containers/NewCharacterContainer';
import SearchForm from './SearchForm';

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
  render() {
    return (
      <div className="app">
        <header>
          <div className="title">5E Character Library</div>
          <SearchForm onNameChange={this.onNameChange}/>
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
