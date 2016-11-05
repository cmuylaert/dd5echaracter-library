import React from "react";

class CharacterDetails extends React.Component {

  render(){
    const loading = this.props.data.loading;
    const character = loading?null:this.props.data.character;
    const classes = loading?null:character.classes.reduce((previous,current)=>{
      return previous + ((previous !="")?", ":"") +`${current.className} ${current.level}`;
    }, "");

    return (
          <div className="character">
            {loading ? <div className="loader"></div> :
              <div><h3 className="name">{character.name} </h3>
              <div className="classes"> {classes} </div></div>
            }
         </div>
    )
  }
}
export default CharacterDetails;
