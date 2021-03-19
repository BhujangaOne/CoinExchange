import React, { Component } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    border: 1px solid red;
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0rem 1.5rem 5rem;
`;

const BtnBalance = styled.button`
    font-size: 1.4rem;
    margin: 1.5rem 0 1.5rem 5rem;
    background-color: rgb(20, 56, 97);
    color: #cccccc;
    border: 1px solid #cccccc;
    border-radius: 7px;
`;




export default class AccountsBalance extends Component {
    render() {
        const buttonText = this.props.showBalance ? "Hide Balance" : "Show Balance";
        let content = null;
        if (this.props.showBalance){
            content = <>Balance: ${this.props.amount}</>;
        }

        

        return (    
        <Section>
        {content}
        <BtnBalance onClick={this.props.handleShowHide}>{buttonText}</BtnBalance>
        </Section>  
        );
    }
}


AccountsBalance.propTypes = {

    amount: PropTypes.number
}