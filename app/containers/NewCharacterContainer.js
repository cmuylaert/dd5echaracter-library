import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import NewCharacter from './../components/NewCharacter';

const NewCharacterMutation = gql`
mutation NewCharacterMutation($name: String!, $classes: [ClassInput]) {
  newCharacter(name:$name,classes:$classes)
  {
    id name classes {
      className level
    }
  }
}`;

export default graphql(NewCharacterMutation, {
  props: ({ mutate }) => ({
    mutate: ({ name, classes }) => mutate({
      variables: { name, classes },
      updateQueries: {
        CharacterQuery: (prev, { mutationResult }) => update(prev, {
          characters: {
            $unshift: [mutationResult.data.newCharacter],
          },
        })
        ,
      },
    }),
  }),
})(NewCharacter);
