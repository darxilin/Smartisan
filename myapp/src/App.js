import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Bottom from "./components/Common/Bottom"

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Bottom/>
        {
        	this.props.children
        }
      </div>
    );
  }
}

export default App;
