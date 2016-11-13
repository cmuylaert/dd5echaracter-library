import React from 'react';

function ClassSelect({ onSelect, defaultClass }) {
  return (
    <select className="classes" onChange={onSelect} defaultValue={defaultClass}>
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
  );
}
ClassSelect.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  defaultClass: React.PropTypes.string.isRequired,
};
export default ClassSelect;
