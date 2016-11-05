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
}`

const DeleteCharacterMutation = gql`
mutation DeleteCharacterMutation($id:String!) {
  deleteCharacter(id:$id)
}`;

export default graphql(CharacterDetailsQuery, {
  options: ({ id, }) => {
    return { variables: {
                id: id,
              }
            }
  }
})(graphql(DeleteCharacterMutation, {
  props: ({ ownProps, mutate }) => ({
    deleteCharacter: ({ id }) => mutate({
      variables: { id },
      updateQueries: {
        CharacterQuery: (prev, { mutationResult }) => {
          const id = mutationResult.data.deleteCharacter;
          let index;
          prev.characters.forEach((elem,i)=>{
            if (elem.id===id){index=i;};
          });
          return update(prev, {
              characters: {
                $splice:  [[index,1]],
              },
          });
        },
      },
    })
  }),
})(CharacterDetails))
