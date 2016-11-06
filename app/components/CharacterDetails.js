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
                                    }}>

                                        <svg className="icon icon-bin" viewBox="0 0 32 32">
                                            <title>floppy-disk</title>
                                            <path className="path1" d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
                                            <path className="path2" d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
                                        </svg>
                            </button>
                            <button className="btn-save"
                                    role="button" title="Save"
                                    onClick={this.updateCharacter}>
                                        <svg className="icon icon-floppy-disk" viewBox="0 0 32 32">
                                            <title>floppy-disk</title>
                                            <path className="path1" d="M28 0h-28v32h32v-28l-4-4zM16 4h4v8h-4v-8zM28 28h-24v-24h2v10h18v-10h2.343l1.657 1.657v22.343z"></path>
                                        </svg>
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
