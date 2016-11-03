import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Characters from './../components/Characters';

const CharacterQuery = gql`query CharacterQuery (
  $name: String) {
  characters (
    name: $name) {
    id
    name
    classes {
      className,level
    }
  }
}`

export default graphql(CharacterQuery, {
  options: ({ name, }) => {
    return { variables: {
                name: name,
              }
            }
  }
})(Characters)
