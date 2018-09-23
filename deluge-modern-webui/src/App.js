import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Navigation from './components/Navigation';
import TorrentGrid from './components/TorrentGrid';
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

  state = {
    loggedIn: false
  };

  componentDidMount() {
    global.api
      .post('json', {
          'method': 'auth.login',
          'params': ['deluge'],
          'id': 1
      }).then(response => {

        console.log(response.data);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="container-fluid">
          <TorrentGrid />
        </div>
      </div>
    );
  }
}

export default App;
