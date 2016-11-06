import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route,  browserHistory } from 'react-router'

import auth from './auth';

import SearchCharacters from './components/SearchCharacters';
import CharacterPage from './components/CharacterPage';
import Signin from './components/Signin';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

class SigninWrapper extends React.Component{
  render(){
    return (<Signin login={auth.login}/>)
  }
}
function requireAuth(nextState, replace) {
  console.log('requireAuth');
  if (!auth.isLoggedIn()) {
    console.log('not logged in');

    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path="/" component={SearchCharacters} onEnter={requireAuth}>
      </Route>
      <Route path="/login" component={SigninWrapper} />
      <Route path="/character/:characterId" component={CharacterPage} onEnter={requireAuth}/>
    </Router>
    </ApolloProvider>,
  document.getElementById('content'));
