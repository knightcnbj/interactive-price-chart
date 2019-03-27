import React, { Component } from 'react';

import LineChart from './LineChart';
import ToolTip from './ToolTip';
import InfoBox from './InfoBox';
import RangeOption from './RangeOption';

import './App.css';

import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
      range: 'month',
      hoverLoc: null,
      activePoint: null,
    };
  }

  handleChartHover(hoverLoc, activePoint) {
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    });
  }

  componentDidMount() {
    const getData = () => {
      const urlMonth = 'https://api.coindesk.com/v1/bpi/historical/close.json';
      const urlAll = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2012-01-01&end=2019-01-10';

      let todayDate = moment().format('YYYY-MM-DD');
      let aWeekBefore = moment().subtract(7, 'days').format('YYYY-MM-DD');
      const urlWeek = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' +
                        aWeekBefore + '&end=' + todayDate;

      const urlMap = {
        'month': urlMonth,
        'week': urlWeek,
        'all': urlAll,
      };

      const priceDataMonth = [];
      const priceDataWeek = [];
      const priceDataAll = [];
      const priceDataMap = {
        'month': priceDataMonth,
        'week': priceDataWeek,
        'all': priceDataAll,
      };

      let myURL = urlMap[this.state.range];
      let myPriceData = priceDataMap[this.state.range];

      fetch(myURL)
        .then(result => result.json())
        .then((bitcoinData) => {
          let count = 0;

          for (const date in bitcoinData.bpi) {
            myPriceData.push({
              d: moment(date).format('YYYY MMM DD'),
              p: bitcoinData.bpi[date].toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
              x: count, //previous day
              y: bitcoinData.bpi[date] // numerical price
            });
            count++;
          }
          this.setState({
            data: myPriceData,
            fetchingData: false,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };

    getData();
  }

  render() {
    return (
      <div className='container'>

        <div className='row'>
          <h1>Bitcoin Price in Past {this.state.range}</h1>
        </div>

        <div className='row'>
          { !this.state.fetchingData ?
          <InfoBox data={this.state.data} />
          : null }
        </div>

        <div className='row'>
          <div className='popup'>
            {this.state.hoverLoc ? 
            <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint}/> : null}
          </div>
        </div>

         <div className='row'>
           <div className='chart'>
             { !this.state.fetchingData ?
               <LineChart data={this.state.data} onChartHover={ (a,b) => this.handleChartHover(a,b) }/>
               : null }
           </div>
         </div>

         <div className='row'>
            <div className='rangeOption'>
                <RangeOption/>
            </div>
         </div>
      </div>
    );
  }
}

export default App;
