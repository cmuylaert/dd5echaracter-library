import React from 'react';
import {browserHistory } from 'react-router';

class Signin extends React.Component {
  login = (e)=> {
    e.preventDefault();
    this.props.login(this.refs.username.value, this.refs.password.value, ()=>{
      browserHistory.push('/');
    });
  }
  render(){return (
    <div className="app">
      <header>
        <div className="title">5E Character Library</div>
      </header>
      <div className="app-container">
        <form>
              <div>
                  <label>Username</label>
                  <input type="text" ref="username"/>
              </div>
              <div>
                  <label>Password</label>
                  <input type="password" ref="password" name="password"/>
              </div>

              <button onClick={this.login} className="btn btn-warning btn-lg">Login</button>
          </form>
        </div>
    </div>
  )};
}
Signin.propTypes = {
  login: React.PropTypes.func.isRequired,
};
export default Signin;
