import React, {useState, useEffect} from 'react';
// import { v4 as uuidv4 } from 'uuid';

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
const formatPrice = price => parseFloat(Number(price).toFixed(4));

function App(props) {
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async () => {
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
      price: formatPrice(coin.quotes.USD.price),
    }
  })
  //Retrieve prices here
  setCoinData(coinPriceData);
  }

  
 useEffect(function() {

  if(coinData.length === 0){
    componentDidMount();
  }
});


  const handleShowHide = () => {
    setShowBalance(oldValue => !oldValue);
   }
   

  const handleRefresh = async (valueChangeId) => {
    const tickerURL = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}` ;
    const response = await axios.get(tickerURL);
    debugger;
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = coinData.map(function ( values ) {  //input argument is 1 object {} with a ticker, name and price
      let newValues = { ...values };
    if(valueChangeId === newValues.key) {
      newValues.price = newPrice;
    }
      return newValues;
    });
    
   
    setCoinData(newCoinData);
  }
    return (
      <Div>
        <ExchangeHeader />
        <h2><AccountsBalance amount={balance} 
                             showBalance={showBalance}
                             handleShowHide={handleShowHide} 
            />
        </h2>
        <Coinlist coinData = {coinData} 
                  showBalance={showBalance}
                  handleRefresh={handleRefresh} 
        />
      </Div>
    );
 
}

export default App;