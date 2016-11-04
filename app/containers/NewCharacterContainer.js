import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import NewCharacter from './../components/NewCharacter';

const NewCharacterMutation = gql`
mutation NewCharacterMutation($name: String!, $classes: [ClassInput]) {
  newCharacter(name:$name,classes:$classes)
  {
    id name classes {
      className level
    }
  }
}`

export default graphql(NewCharacterMutation)(NewCharacter);
