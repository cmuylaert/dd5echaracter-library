import React, { PropTypes } from 'react';
import ClassSelect from './ClassSelect';


class ClassInput extends React.Component {
  handleClassChange = (e) => {
    this.props.update(this.props.index, e.target.value);
  };
  handleLevelChange = (e) => {
    this.props.update(this.props.index, undefined, e.target.value);
  };
  render() {
    return (
      <div>
        <ClassSelect onSelect={this.handleClassChange} defaultClass="barbarian" />
        <input onChange={this.handleLevelChange} type="number" placeholder="Level" />
      </div>
    );
  }
}
ClassInput.propTypes = {
  update: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
};
export default ClassInput;
