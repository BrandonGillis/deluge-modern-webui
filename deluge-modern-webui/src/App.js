import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Navigation from './components/Navigation';
import TorrentGrid from './components/TorrentGrid';
import Login from './components/Login';
import axios from "axios";

var server = "http://lvh.me:8112/";
    global.api = axios.create({
      baseURL: server,
      timeout: 1000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });

class App extends Component {

  constructor(props) {
    super(props)
    // Bind the this context to the handler function
    this.loginHandler = this.loginHandler.bind(this);

    // Set some state
    this.state = {
      loggedIn: false,
      loginError: false
    };
  }

  loginHandler(password) {
    global.api
      .post('json', {
        'method': 'auth.login',
        'params': [password],
        'id': 1
      }).then(response => {
        var logged = response.data.result;
        if (logged) {
          this.setState({
            loggedIn: true
          });
        } else {
          this.setState({
            loggedIn: false,
            loginError: true
          });
        }
      })
      .catch(error => this.setState({ loginError: true }));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="container-fluid">
          {!this.state.loggedIn && <Login loginHandler={this.loginHandler} error={this.state.loginError} />}
          {this.state.loggedIn && <TorrentGrid />}
        </div>
      </div>
    );
  }
}

export default App;
