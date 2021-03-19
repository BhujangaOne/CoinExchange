import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TD = styled.td` {
    border: 1px solid #cccccc;
    width: 25vh;
}`;

export default class Coin extends Component {
    
        handleClick = (event) => {
            //Prevent default action of submitting the form
            event.preventDefault();
            //when call (f.e. by button) Passes this.props.ticker to the handleRefresh function in App.js. App.js is inheriting Coinlist.jsx which is inheriting Coin.jsx
            this.props.handleRefresh(this.props.ticker);
    }

    render() {
        const balance = this.props.showBalance ? <TD>{this.props.balance}</TD> : null;
        return (
            <tr>
                <TD>{this.props.name}</TD>
                <TD>{this.props.ticker}</TD>
                <TD>${this.props.price}</TD>
                {balance}
                <TD>
                    <form action="#" method="POST">
                        <button onClick={this.handleClick}>Refresh</button>
                    </form>
                </TD>
            </tr>  
        );
    }
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}