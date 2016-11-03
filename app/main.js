import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient();

class Content extends React.Component{
  render() {
    return (
      <div>
        <b>Congratulations</b>, you are now ready to implement your client side application! Enjoy :-)
      </div>
    );
  }
}
ReactDOM.render(
  <ApolloProvider client={client}>
      <Content />
    </ApolloProvider>,
  document.getElementById('content'));
