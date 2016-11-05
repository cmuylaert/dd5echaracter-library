import React from "react";

class ClassSelect extends React.Component {
  render(){
    return (
      <select className="classes" onChange={this.props.onSelect} defaultValue={this.props.default}>
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
    )
  }
}
ClassSelect.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  default: React.PropTypes.string.isRequired,
};
export default ClassSelect;
