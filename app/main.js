import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import CharactersContainer from './containers/CharactersContainer';

const client = new ApolloClient();

class Content extends React.Component{
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
        </header>
        <div className="app-container">
          <SearchForm onNameChange="{this.onNameChange}"/>
          <CharactersContainer name={this.state.name}/>
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <ApolloProvider client={client}>
      <Content />
    </ApolloProvider>,
  document.getElementById('content'));
