import React, { Component } from 'react';
import LineChart from './LineChart';

import './App.css';

class App extends Component {
  createFakeData(){
    // This function creates data that doesn't look entirely random
    const data = []
    for (let x = 0; x <= 30; x++) {
      const random = Math.random();
      const temp = data.length > 0 ? data[data.length-1].y : 50;
      const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
      data.push({x,y})
    }
    return data;
  }

  render() {
    return (
      <div className="App">
        <div className="header">react svg line chart [part 1]</div>
        <LineChart data={this.createFakeData()} />
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <p>
  //           Edit <code>src/App.js</code> and save to reload.
  //         </p>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //     </div>
  //   );
  // }
}

export default App;
