import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import CharacterDetails from './../components/CharacterDetails';

const CharacterDetailsQuery = gql`query CharacterDetailsQuery (
  $id: String) {
  character (
    id: $id) {
    id name  background alignment race
    classes {
      className level
    }
  }
}`;
const UpdateCharacterMutation = gql`mutation UpdateCharacterMutation (
  $character:CharacterInput!) {
  updateCharacter(character:$character)  {
    id name  background alignment race
    classes {
      className level
    }
  }
}`;
const DeleteCharacterMutation = gql`
mutation DeleteCharacterMutation($id:String!) {
  deleteCharacter(id:$id)
}`;

export default
graphql(UpdateCharacterMutation, {
  props: ({ mutate }) => ({
    updateCharacter: ({ character }) => mutate({
      variables: { character },
    }),
  }),
})(
graphql(CharacterDetailsQuery, {
  options: ({ id }) => ({ variables: {
    id,
  },
  }),
})(graphql(DeleteCharacterMutation, {
  props: ({ mutate }) => ({
    deleteCharacter: ({ id }) => mutate({
      variables: { id },
      updateQueries: {
        CharacterQuery: (prev, { mutationResult }) => {
          const deletedId = mutationResult.data.deleteCharacter;
          let index;
          prev.characters.forEach((elem, i) => {
            if (elem.id === deletedId) { index = i; }
          });
          return update(prev, {
            characters: {
              $splice: [[index, 1]],
            },
          });
        },
      },
    }),
  }),
})(CharacterDetails)));
