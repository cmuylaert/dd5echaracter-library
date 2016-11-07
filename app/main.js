import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route,  browserHistory } from 'react-router'

import auth from './auth';

import SearchCharacters from './components/SearchCharacters';
import CharacterSheet from './components/CharacterSheet';
import Signin from './components/Signin';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

class SigninWrapper extends React.Component{
  render(){
    return (<Signin login={auth.login} register={auth.register}/>)
  }
}
function requireAuth(nextState, replace) {
  if (!auth.isLoggedIn()) {

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
      <Route path="/character/:characterId" component={CharacterSheet} onEnter={requireAuth}/>
    </Router>
    </ApolloProvider>,
  document.getElementById('content'));
