import React from "react";

class Character extends React.Component {
  render(){
    let char = this.props.character;
    let classes = char.classes.reduce((previous,current)=>{
      return previous + ((previous !="")?", ":"") +`${current.className} ${current.level}`;
    }, "");
    return (
          <div>{char.name}  {classes} </div>
    )
  }
}
export default Character;
