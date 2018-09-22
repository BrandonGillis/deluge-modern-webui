import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Navigation from './components/Navigation';
import TorrentGrid from './components/TorrentGrid';

class App extends Component {
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
