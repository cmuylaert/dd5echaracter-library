import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Attribute from './Attribute';

class CharacterDetails extends Component {
  constructor(props) {
    super(props);
    this.state = props.data.loading ? {} : { ...props.data.character };
    this.state.attributes = this.state.attributes || {};
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading && !this.state.character) {
      this.setState({ ...nextProps.data.character });
    }
  }
  onAttrChange=(attrName, newValue) => {
    const attributes = { ...this.state.attributes };
    attributes[attrName] = newValue;
    this.setState({ attributes });
  };
  updateCharacter = (e) => {
    e.preventDefault();
    const character = Object.keys(this.refs).reduce(
        (result, key) => Object.assign(result, { [key]: this.refs[key].value }),
        {});
    character.id = this.props.data.character.id;
    character.attributes = { ...this.state.attributes };
    this.props.updateCharacter({ character });
  };
  deleteCharacter = (e) => {
    e.preventDefault();
    this.props.deleteCharacter({ id: this.props.data.character.id }).then((result) => {
      browserHistory.push('/');
    });
  };
  render() {
    const loading = this.props.data.loading;
    const classes = loading ? null : this.state.classes.reduce((previous, current) =>
      `${previous + ((previous !== '') ? ', ' : '')}${current.className} ${current.level}`, '');

    return (
      <div>
        {loading ? <div className="loader" /> :
        <div className="row character-details">
          <div className="character">
            <h3 className="name">
              <input type="text" ref="name" defaultValue={this.state.name} />
            </h3>
            <div className="classes"> {classes} </div>
            <input
              type="text" ref="background" placeholder="Background"
              defaultValue={this.state.background}
            />
            <input
              type="text" ref="race" placeholder="Race"
              defaultValue={this.state.race}
            />
            <input
              type="text" ref="alignment" placeholder="Alignment"
              defaultValue={this.state.alignment}
            />
            <input
              type="number" ref="xp" placeholder="Experience Points"
              defaultValue={this.state.xp}
            />
            <button
              className="btn-delete"
              role="button" title="Delete"
              onClick={(e) => {
                if (confirm(`Delete ${this.state.name}?`)) {
                  this.deleteCharacter(e);
                }
              }}
            >

              <svg className="icon icon-bin" viewBox="0 0 32 32">
                <title>floppy-disk</title>
                <path className="path1" d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z" />
                <path className="path2" d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z" />
              </svg>
            </button>
            <button
              className="btn-save"
              role="button" title="Save"
              onClick={this.updateCharacter}
            >
              <svg className="icon icon-floppy-disk" viewBox="0 0 32 32">
                <title>floppy-disk</title>
                <path className="path1" d="M28 0h-28v32h32v-28l-4-4zM16 4h4v8h-4v-8zM28 28h-24v-24h2v10h18v-10h2.343l1.657 1.657v22.343z" />
              </svg>
            </button>
          </div>
          <div className="character character-attributes">
            <Attribute onAttrChange={this.onAttrChange} attrName="STR" defaultAttr={this.state.attributes.STR || null} />
            <Attribute onAttrChange={this.onAttrChange} attrName="DEX" defaultAttr={this.state.attributes.DEX || null} />
            <Attribute onAttrChange={this.onAttrChange} attrName="CON" defaultAttr={this.state.attributes.CON || null} />
            <Attribute onAttrChange={this.onAttrChange} attrName="INT" defaultAttr={this.state.attributes.INT || null} />
            <Attribute onAttrChange={this.onAttrChange} attrName="WIS" defaultAttr={this.state.attributes.WIS || null} />
            <Attribute onAttrChange={this.onAttrChange} attrName="CHA" defaultAttr={this.state.attributes.CHA || null} />
          </div>
        </div>
                        }
      </div>
    );
  }
}
CharacterDetails.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    character: PropTypes.object,
  }).isRequired,
  updateCharacter: PropTypes.func.isRequired,
  deleteCharacter: PropTypes.func.isRequired,
};
export default CharacterDetails;
