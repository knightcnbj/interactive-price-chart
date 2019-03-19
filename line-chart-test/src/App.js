import React, { Component } from 'react';
import LineChart from './LineChart';
import ToolTip from './ToolTip';
import InfoBox from './InfoBox';

import './App.css';

import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
      hoverLoc: null,
      activePoint: null
    };
  }

  handleChartHover(hoverLoc, activePoint){
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    });
  }

  componentDidMount() {
    const getData = () => {
      const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

      fetch(url).then( r => r.json())
        .then((bitcoinData) => {
          const sortedData = [];
          let count = 0;
          for (let date in bitcoinData.bpi){
            sortedData.push({
              d: moment(date).format('MMM DD'),
              p: bitcoinData.bpi[date].toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
              x: count, //previous days
              y: bitcoinData.bpi[date] // numerical price
            });
            count++;
          }
          this.setState({
            data: sortedData,
            fetchingData: false
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };

    getData();
  }

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
      <div className='container'>

         <div className='row'>
           <h1>30 Day Bitcoin Price Chart</h1>
         </div>

         {/* <div className='row'>
           { !this.state.fetchingData ?
          <InfoBox data={this.state.data} />
          : null }
        </div>

         <div className='row'>
           <div className='popup'>
             {this.state.hoverLoc ? <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint}/> : null}
           </div>
         </div> */}

         <div className='row'>
           <div className='chart'>
             { !this.state.fetchingData ?
               <LineChart data={this.state.data} onChartHover={ (a,b) => this.handleChartHover(a,b) }/>
               : null }
           </div>
         </div>

      </div>
    );
  }
}

export default App;
