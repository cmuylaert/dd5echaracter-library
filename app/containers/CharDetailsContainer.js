import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CharacterDetails from './../components/CharacterDetails';

const CharacterDetailsQuery = gql`query CharacterDetailsQuery (
  $id: String) {
  character (
    id: $id) {
    id
    name
    classes {
      className,level
    }
  }
}`

export default graphql(CharacterDetailsQuery, {
  options: ({ id, }) => {
    return { variables: {
                id: id,
              }
            }
  }
})(CharacterDetails)
