import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import TransactionDate from './TransactionDate/TransactionDate'

class TransactionHistory extends Component {

    componentDidMount() {
        // if (this.props.driver) {
        //     this.props.history.push("/");
        // }
    }
    render() {
        let transactionLast = <Redirect to="/" />
        if (this.props.driver.last_payment_date) {
            transactionLast = <TransactionDate
                transaction={this.props.driver.last_payment_date}
              />
        }
        return (
            <div>
                {transactionLast}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        driver: state.driver,
    }
}


export default connect(mapStateToProps)(TransactionHistory);