import React from "react";
import {browserHistory} from 'react-router'

class CharacterDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data.loading ? {} : {...props.data.character};
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.data.loading && !this.state.character) {
            this.setState({...nextProps.data.character});
        }
    }

    deleteCharacter = (e) => {
        e.preventDefault();
        this.props.deleteCharacter({id: this.props.data.character.id}).then((result)=> {
            browserHistory.push('/');
        });
    };
    updateCharacter = (e) => {
        e.preventDefault();
        const character = Object.keys(this.refs).reduce((result, key)=> {
            result[key] = this.refs[key].value;
            return result;
        }, {});
        character.id = this.props.data.character.id;
        this.props.updateCharacter({character});
    };

    render() {
        const loading = this.props.data.loading;
        const classes = loading ? null : this.state.classes.reduce((previous, current)=> {
            return previous + ((previous != "") ? ", " : "") + `${current.className} ${current.level}`;
        }, "");

        return (
            <div>
                {loading ? <div className="loader"></div> :
                    <div className="row character-details">
                        <div className="character">
                            <h3 className="name"><input type="text" ref="name" defaultValue={this.state.name}/></h3>
                            <div className="classes"> {classes} </div>
                            <input type="text" ref="background" placeholder="Background"
                                   defaultValue={this.state.background}/>
                            <button className="btn-delete"
                                    role="button" title="Delete"
                                    onClick={(e) => {
                                        if (confirm(`Delete ${character.name}?`)) {
                                            this.deleteCharacter(e)
                                        }
                                    }}> X
                            </button>
                            <button className="btn-save"
                                    role="button" title="Save"
                                    onClick={this.updateCharacter}> Save
                            </button>
                        </div>
                        <div className="character character-attributes">
                            <div className="attibute">
                                <div className="name">STR</div>
                                <div className="value"><input type="number" placeholder="10" /></div>
                                <div className="modifier">0</div>
                            </div>
                            <div className="attibute">
                                <div className="name">DEX</div>
                                <div className="value"><input type="number" placeholder="10" /></div>
                                <div className="modifier">0</div>
                            </div>
                            <div className="attibute">
                                <div className="name">CON</div>
                                <div className="value"><input type="number" placeholder="10" /></div>
                                <div className="modifier">0</div>
                            </div>
                            <div className="attibute">
                                <div className="name">INT</div>
                                <div className="value"><input type="number" placeholder="10" /></div>
                                <div className="modifier">0</div>
                            </div>
                            <div className="attibute">
                                <div className="name">WIS</div>
                                <div className="value"><input type="number" placeholder="10" /></div>
                                <div className="modifier">0</div>
                            </div>
                            <div className="attibute">
                                <div className="name">CHA</div>
                                <div className="value"><input type="number" placeholder="10" /></div>
                                <div className="modifier">0</div>
                            </div>
                            <div/>
                        </div>
                    </div>
                        }
            </div>
        )
    }
}
export default CharacterDetails;
