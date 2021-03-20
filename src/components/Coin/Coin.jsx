import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TD = styled.td` {
    border: 1px solid #cccccc;
    width: 25vh;
}`;

export default function Coin(props){
    
    const handleClick = (event) => {
            //Prevent default action of submitting the form
            event.preventDefault();
            //when call (f.e. by button) Passes this.props.ticker to the handleRefresh function in App.js. App.js is inheriting Coinlist.jsx which is inheriting Coin.jsx
            props.handleRefresh(props.tickerId);
    }      
        return (
            <tr>
                <TD>{props.name}</TD>
                <TD>{props.ticker}</TD>
                <TD>${props.price}</TD>
                {props.showBalance ? <TD>{props.balance}</TD> : null}
                <TD>
                    <form action="#" method="POST">
                        <button onClick={handleClick}>Refresh</button>
                    </form>
                </TD>
            </tr>  
        );
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}