import React from 'react';
import { browserHistory } from 'react-router';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  login = (e) => {
    e.preventDefault();
    this.props.login(this.refs.username.value, this.refs.password.value, (success) => {
      if (success) {
        browserHistory.push('/');
      }
    });
  };
  register = (e) => {
    e.preventDefault();

    const password1 = this.refs.password1.value;
    const password2 = this.refs.password2.value;
    const valid = password1.length > 3
      && password1 === password2
      && this.refs.newUsername.value.length > 3;
    if (!valid) {
      this.setState({ showRegisterError: true });
    } else {
      this.setState({ showRegisterError: false });
      this.props.register(this.refs.newUsername.value, this.refs.password1.value, (success) => {
        if (success) {
          browserHistory.push('/');
        }
      });
    }
  };
  render() {
    const errorClass = `error${this.state.showRegisterError ? '' : ' hidden'}`;
    return (
      <div className="app">
        <header>
          <div className="title">5E Character Library</div>
        </header>
        <div className="app-container">
          <form>
            <h3>Login</h3>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" ref="username" name="username" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" ref="password" name="password" />
            </div>

            <button onClick={this.login} className="btn btn-warning btn-lg">Login</button>
          </form>
          <form>
            <h3>Create account</h3>
            <div>
              <label htmlFor="newUsername">Username</label>
              <input type="text" ref="newUsername" name="newUsername" />
            </div>
            <div>
              <label htmlFor="password1">Password</label>
              <input type="password" ref="password1" name="password1" />
            </div>
            <div>
              <label htmlFor="password2">Confirm your Password</label>
              <input type="password" ref="password2" name="password2" />
            </div>
            <button onClick={this.register} className="btn btn-warning btn-lg">Create</button>
            <div className={errorClass}>
              <span>Username is required & passwords must match</span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
Signin.propTypes = {
  login: React.PropTypes.func.isRequired,
  register: React.PropTypes.func.isRequired,
};
export default Signin;
