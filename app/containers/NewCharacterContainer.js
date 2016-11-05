import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'react-addons-update';

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

export default graphql(NewCharacterMutation,{
  props: ({ ownProps, mutate }) => ({
    mutate: ({ name, classes }) => mutate({
      variables: { name, classes },
      updateQueries: {
        CharacterQuery: (prev, { mutationResult }) => {
          const newCharacter = mutationResult.data.newCharacter;
          console.log(prev);
          return update(prev, {
              characters: {
                $unshift: [newCharacter],
              },
          });
        },
      },
    })
  }),
})(NewCharacter);
