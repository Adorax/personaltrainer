import React, { Component } from 'react';
import './App.css';
import Navigator from './route/Navigator'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Personal trainer</h1>
        </header>
        <Navigator />
      </div>
    );
  }
}

export default App;
