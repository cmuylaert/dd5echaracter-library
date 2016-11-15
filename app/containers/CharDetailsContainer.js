import { graphql } from 'react-apollo';
import { createFragment } from 'apollo-client';

import gql from 'graphql-tag';
import update from 'immutability-helper';

import CharacterDetails from './../components/CharacterDetails';

const fullCharacterFragment = createFragment(gql`
  fragment fullCharacter on Character {
      id name  background alignment race
      classes {
          className level
      }
      attributes {
          STR
          DEX
          CON
          INT
          WIS
          CHA
      }
      public
  }
`);

const CharacterDetailsQuery = gql`query CharacterDetailsQuery (
  $id: String) {
  character (
    id: $id) {
    ...fullCharacter
  }
}`;
const UpdateCharacterMutation = gql`mutation UpdateCharacterMutation (
  $character:CharacterInput!) {
  updateCharacter(character:$character)  {
    ...fullCharacter
  }
}`;
const DeleteCharacterMutation = gql`
mutation DeleteCharacterMutation($id:String!) {
  deleteCharacter(id:$id)
}`;

export default
graphql(UpdateCharacterMutation, {
  options: { fragments: fullCharacterFragment },
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
    fragments: fullCharacterFragment,
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
