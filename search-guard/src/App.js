import React, { Component } from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-intro">
            <Route path='/home' exact component={Home} />
            <Route path='/next' component={Next} />
            <Route path='/last' component={Last} />
            <Redirect to='/home' />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
