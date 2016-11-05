import React from "react";
import { browserHistory } from 'react-router'

class CharacterDetails extends React.Component {
  constructor(props){
    super(props);
    this.state=props.data.loading?{}:{...props.data.character};
  }
  componentWillReceiveProps(nextProps){
      if(!nextProps.data.loading&&!this.state.character){
        this.setState({...nextProps.data.character});
      }
  }

  deleteCharacter = (e) => {
    e.preventDefault();
    this.props.deleteCharacter({id: this.props.data.character.id}).then((result)=>{
      browserHistory.push('/');
    });
  }
  updateCharacter = (e) => {
    e.preventDefault();
    // this.props.updateCharacter({character:this.state});
  }

  render(){
    const loading = this.props.data.loading;
    const classes = loading?null:this.state.classes.reduce((previous,current)=>{
      return previous + ((previous !="")?", ":"") +`${current.className} ${current.level}`;
    }, "");

    return (
          <div className="character character-details">
            {loading ? <div className="loader"></div> :
              <div>
                <h3 className="name"><input type="text" ref="name" defaultValue={this.state.name}/></h3>
                <div className="classes"> {classes} </div>
                <input type="text" ref="background" onChange={(e)=>{this.setState({background:e.target.value});}} placeholder="Background" defaultValue={this.state.background}/>
                <button className="btn-delete"
                 role="button" title="Delete"
                 onClick={(e) => {if(confirm(`Delete ${character.name}?`)) {this.deleteCharacter(e)};}} > X </button>
                <button className="btn-save"
                 role="button" title="Save"
                 onClick={this.updateCharacter} > Save </button>

              </div>
            }
         </div>
    )
  }
}
export default CharacterDetails;
