import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Coinlist from './components/Coinlist/Coinlist';
import AccountsBalance from './components/AccountsBalance/AccountsBalance';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';

import styled from 'styled-components';
import axios from 'axios';

const Div = styled.div`
text-align: center;
background-color: rgba(11, 11, 114, 0.938);
color: #cccccc
`;

const coinCount = 9;

class App extends React.Component {
  state = {
    balance: 10000,
    showBalance: true,
    coinData: [ /*
      {
        key: uuidv4(),
        name: "Bitcoin",
        ticker: "BTC",
        balance: 1,
        price: 9999.99
      },
      {
        key: uuidv4(),
        name: "Ethereum",
        ticker: "ETH",
        balance: 32,
        price: 1800.25
      },
      {
        key: uuidv4(),
        name: "Tether",
        ticker: "USDT",
        balance: 0,
        price: 1.0
      },
      {
        key: uuidv4(),
        name: "Ripple",
        ticker: "XRP",
        balance: 1000,
        price: 0.98
      },
      {
        key: uuidv4(),
        name: "Bitcoin Cash",
        ticker: "BCH",
        balance: 0,
        price: 435.45
      } */
    ]
  }
  componentDidMount = async () => {
  const response = await axios.get('https://api.coinpaprika.com/v1/coins');

  const coinIds = response.data.slice(0, coinCount).map(coin => coin.id); 
  const tickerURL = 'https://api.coinpaprika.com/v1/tickers/';
  const promises = coinIds.map((id) => axios.get(tickerURL + id));
  const coinData = await Promise.all(promises);
  const coinPriceData = coinData.map(function(response) {
    const coin = response.data;
    return {
      key: coin.id,
      name: coin.name,
      ticker: coin.symbol,
      balance: 0,
      price: parseFloat(Number(coin.quotes.USD.price).toFixed(4)),
    }
  })
  //Retrieve prices here
  this.setState({ coinData: coinPriceData });
  }


  handleShowHide = () => {
    this.setState(function (oldState) {
     return {
       ...oldState,
       showBalance: !oldState.showBalance
     }
    });
   }

  handleRefresh = (valueChangeTicker) => {
    const newCoinData = this.state.coinData.map(function ( values ) {  //input argument is 1 object {} with a ticker, name and price
      let newValues = { ...values };
    if(valueChangeTicker === newValues.ticker) {
      const randomPercentage = 0.995 + Math.random() * 0.01;
      newValues.price *= randomPercentage;
          
    }
      return newValues;
    });
    
    //  SetStatefunction could look like this too: this.setState( oldState => {/*inputnewstatehere*/})
    //but this is also possible, if we use a part of a state only
    this.setState({coinData: newCoinData}); //also works with an object {}
  }
 

  render(){

    return (
      <Div>
        <ExchangeHeader />
        <h2><AccountsBalance amount={this.state.balance} 
                             showBalance={this.state.showBalance}
                             handleShowHide={this.handleShowHide} 
            />
        </h2>
        <Coinlist coinData = {this.state.coinData} 
                  showBalance={this.state.showBalance}
                  handleRefresh={this.handleRefresh} 
        />
      </Div>
    );

  }
 
}

export default App;
