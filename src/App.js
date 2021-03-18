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
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh(valueChangeTicker) {
    const newCoinData = this.state.coinData.map(function ( {ticker, name, price}) {  //input argument is 1 object {} with a ticker, name and price
      let newPrice = price; //Why do we set newPrice to anything at all? We are changing it anyway inside the if statement?? AH! because it is possible that the if statement does not apply, in this case we return the newPrice as well but without change
    if(valueChangeTicker === ticker) {
      const randomPercentage = 0.995 + Math.random() * 0.01;
    newPrice =  newPrice * randomPercentage;
    
        
      }
      return {
        ticker: ticker,  //when key matches value, we could also shorthand it and write ticker only. 
        name: name,
        price: newPrice
      }

    });
    
    //  SetStatefunction could look like this too: this.setState( oldState => {/*inputnewstatehere*/})
    //but this is also possible, if we use a part of a state only
    this.setState({coinData: newCoinData});
  }

  render(){

    return (
      <Div>
        <ExchangeHeader />
        <h2><AccountsBalance amount={this.state.balance} /></h2>
        <Coinlist coinData = {this.state.coinData} handleRefresh={this.handleRefresh} />
      </Div>
    );

  }
 
}

export default App;
