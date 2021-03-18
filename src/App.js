import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Coinlist from './components/Coinlist/Coinlist';
import AccountsBalance from './components/AccountsBalance/AccountsBalance';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';

import styled from 'styled-components';

const Div = styled.div`
text-align: center;
background-color: rgba(11, 11, 114, 0.938);
color: #cccccc
`;

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      balance: 10000,
      coinData: [
        {
          key: uuidv4(),
          name: "Bitcoin",
          ticker: "BTC",
          price: 9999.99
        },
        {
          key: uuidv4(),
          name: "Ethereum",
          ticker: "ETH",
          price: 1800.25
        },
        {
          key: uuidv4(),
          name: "Tether",
          ticker: "USDT",
          price: 1.0
        },
        {
          key: uuidv4(),
          name: "Ripple",
          ticker: "XRP",
          price: 0.98
        },
        {
          key: uuidv4(),
          name: "Bitcoin Cash",
          ticker: "BCH",
          price: 435.45
        }
      ]
    }
  }

  render(){

    return (
      <Div>
        <ExchangeHeader />
        <h2><AccountsBalance amount={this.state.balance} /></h2>
        <Coinlist coinData = {this.state.coinData} />
      </Div>
    );

  }
 
}

export default App;
