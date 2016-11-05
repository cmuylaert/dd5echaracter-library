import React from "react";

class Character extends React.Component {
  render(){
    let char = this.props.character;
    let classes = char.classes.reduce((previous,current)=>{
      return previous + ((previous !="")?", ":"") +`${current.className} ${current.level}`;
    }, "");
    return (
       <div className="character">
          <h3 className="name">{char.name} </h3> <div className="classes"> {classes} </div>
      </div>
    )
  }
}
export default Character;
