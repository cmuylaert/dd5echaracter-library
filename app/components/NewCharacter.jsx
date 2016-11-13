import React from 'react';
import ClassInput from './ClassInput';

class NewCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
      classInputs: [<ClassInput key="0" update={this.updateClassValue} index="0" />],
      classInputValues: [{ className: 'barbarian', level: null }],
    };
  }
  updateName = (e) => {
    this.setState({ newName: e.target.value });
  };
  updateClassValue= (index, className, level) => {
    const classInputValues = this.state.classInputValues || [];
    const oldClassName = classInputValues[index] ? classInputValues[index].className : '';
    const oldLevel = classInputValues[index] ? classInputValues[index].level : '';

    classInputValues[index] = {
      className: className || oldClassName,
      level: level || oldLevel,
    };
    this.setState({ classInputValues });
  };
  addClassInput = (e) => {
    e.preventDefault();
    const classInputs = this.state.classInputs;
    const classInputValues = this.state.classInputValues;
    this.setState({
      classInputs: classInputs.concat(<ClassInput
        key={classInputs.length}
        update={this.updateClassValue}
        index={classInputs.length}
      />),
      classInputValues: classInputValues.concat({ className: 'barbarian', level: null }),
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const classes = this.state.classInputValues.filter(value => typeof value.level === 'string').map(value => ({ className: value.className, level: Number(value.level) }));
    this.props.mutate({ name: this.state.newName, classes });
  // TODO clean this mess; extract initialState to reuse.
    const resetState = {
      classInputs: [<ClassInput key="0" update={this.updateClassValue} index="0" />],
      classInputValues: [{ className: 'barbarian', level: null }],
    };
    this.state = resetState;
    this.setState(resetState);
  };

  render() {
    return (
      <form className="container newcharacter-form">
        <input type="text" placeholder="Name" ref="newName" onChange={this.updateName} />
        {this.state.classInputs}

        <button className="btn btn-round btn-assertive" role="button" title="Add a class" onClick={this.addClassInput} > + </button>
        <button className="btn btn-success" role="button" onClick={this.handleSubmit} >Save Character</button>
      </form>
    );
  }
}
NewCharacter.propTypes = {
  mutate: React.PropTypes.func.isRequired,
};
export default NewCharacter;
