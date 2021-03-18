import React, { Component } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    border: 1px solid red;
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0rem 1.5rem 5rem;
`;


export default class AccountsBalance extends Component {
    render() {
        return (    
        <Section>
         Acccount balance: ${this.props.amount}
        </Section>  
        );
    }
}


AccountsBalance.propTypes = {

    amount: PropTypes.number
}