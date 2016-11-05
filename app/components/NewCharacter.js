import React from "react";

class ClassInput extends React.Component {
  constructor(props) {
        super(props);
    }
    handleClassChange = (e)=>{
       this.props.update(this.props.index, e.target.value);
    }
    handleLevelChange = (e)=>{
      this.props.update(this.props.index,undefined, e.target.value);
    }
  render(){
    return (
      <div>
        <select className="classes" onChange={this.handleClassChange} defaultValue="barbarian">
          <option value="barbarian">barbarian</option>
          <option value="bard">bard</option>
          <option value="cleric">cleric</option>
          <option value="druid">druid</option>
          <option value="fighter">fighter</option>
          <option value="monk">monk</option>
          <option value="paladin">paladin</option>
          <option value="rogue">rogue</option>
          <option value="sorcerer">sorcerer</option>
          <option value="warlock">warlock</option>
          <option value="wizard">wizard</option>
        </select>
        <input onChange={this.handleLevelChange} type="number" placeholder="Level" />
      </div>
    );
  }
}
class NewCharacter extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            newName:"",
            classInputs: [<ClassInput key="0" update={this.updateClassValue} index="0"/>],
            classInputValues:[{className:"barbarian",level:null}]
          };
    }
    updateName = (e) => {
      this.setState({newName:e.target.value});
    }
    updateClassValue= (index, className,level)=> {
      let classInputValues = this.state.classInputValues||[];
      const oldClassName= classInputValues[index]?classInputValues[index].className:"";
      const oldLevel= classInputValues[index]?classInputValues[index].level:"";

      classInputValues[index] = {
        className:className?className:oldClassName,
        level:level?level:oldLevel
      };
      this.setState({classInputValues} );
    };
   addClassInput = (e) => {
     e.preventDefault();
    const classInputs = this.state.classInputs;
    const classInputValues = this.state.classInputValues;
    this.setState({
        classInputs: classInputs.concat(<ClassInput key={classInputs.length} update={this.updateClassValue} index={classInputs.length}/>),
        classInputValues: classInputValues.concat({className:"barbarian",level:null})
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const classes = this.state.classInputValues.filter(value=>value.level?true:false).map((value) => { return {className:value.className,level:Number(value.level)};});
    this.props.mutate({name:this.state.newName,classes:classes});
  //TODO clean this mess; extract initialState to reuse.
  const resetState= {
    classInputs: [<ClassInput key="0" update={this.updateClassValue} index="0"/>],
    classInputValues:[{className:"barbarian", level:null}]
  };
  this.state = resetState;
  this.setState(resetState);

};

  render(){
    return (
      <form className="container">
        <input type="text" placeholder="Name" ref="newName" onChange={this.updateName}/>
        {this.state.classInputs}

        <button className="btn-round btn-assertive" role="button" title="Add a class" onClick={this.addClassInput} > + </button>
        <button className="btn-success" role="button" onClick={this.handleSubmit} >Save Character</button>
      </form>
    )

  }
}
export default NewCharacter;
