import React from 'react';

function calcModifier(attribute) {
  return Math.floor((attribute - 10) / 2);
}
class Attribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modifier: this.props.defaultAttr ? calcModifier(this.props.defaultAttr) : 0 };
  }
  onAttrChange=(e) => {
    const newValue = e.target.value;
    this.props.onAttrChange(this.props.attrName, Number(newValue));
    this.setState({ modifier: calcModifier(newValue) });
  };
  render() {
    return (
      <div className="attibute">
        <div className="name"> {this.props.attrName} </div>
        <div className="value"><input type="number" placeholder="10" onChange={this.onAttrChange} defaultValue={this.props.defaultAttr} /></div>
        <div className="modifier"> {this.state.modifier} </div>
      </div>
    );
  }
}
Attribute.propTypes = {
  onAttrChange: React.PropTypes.func.isRequired,
  defaultAttr: React.PropTypes.number,
  attrName: React.PropTypes.string.isRequired,
};
export default Attribute;
