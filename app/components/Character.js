import React from "react";
import { Link } from 'react-router'

class Character extends React.Component {
  render(){
    let char = this.props.character;
    let classes = char.classes.reduce((previous,current)=>{
      return previous + ((previous !="")?", ":"") +`${current.className} ${current.level}`;
    }, "");
    return (
      <Link to={`/character/${char.id}`}>
       <div className="character">
          <h3 className="name">{char.name} </h3> <div className="classes"> {classes} </div>
      </div>
      </Link>
    )
  }
}
export default Character;
