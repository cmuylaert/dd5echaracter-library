import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, browserHistory } from 'react-router';

import auth from './auth';

import SearchCharacters from './components/SearchCharacters';
import CharacterSheet from './components/CharacterSheet';
import Signin from './components/Signin';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    req.options.headers.authorization = auth.getToken() || null;
    next();
  },
}]);

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  networkInterface,
});


function SigninWrapper() {
  return (<Signin login={auth.login} register={auth.register} />);
}
function requireAuth(nextState, replace) {
  if (!auth.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path="/" component={SearchCharacters} onEnter={requireAuth} />
      <Route path="/login" component={SigninWrapper} />
      <Route path="/character/:characterId" component={CharacterSheet} onEnter={requireAuth} />
    </Router>
  </ApolloProvider>,
  document.getElementById('content'));
