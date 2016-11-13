import React from 'react';
import { Link } from 'react-router';

function Character({ character }) {
  const classes = character.classes.reduce((previous, current) => `${previous + ((previous !== '') ? ', ' : '')}${current.className} ${current.level}`, '');

  return (
    <Link to={`/character/${character.id}`}>
      <div className="character">
        <h3 className="name">{character.name} </h3> <div className="classes"> {classes} </div>
      </div>
    </Link>
  );
}
Character.propTypes = {
  character: React.PropTypes.object.isRequired,
};
export default Character;
