import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route,  browserHistory } from 'react-router'

import SearchCharacters from './components/SearchCharacters';
import CharacterPage from './components/CharacterPage';

const client = new ApolloClient();


ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path="/" component={SearchCharacters}>
      </Route>
      <Route path="/character/:characterId" component={CharacterPage}/>

    </Router>
    </ApolloProvider>,
  document.getElementById('content'));
