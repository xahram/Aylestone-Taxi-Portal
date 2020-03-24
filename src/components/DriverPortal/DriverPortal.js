import React, { Component } from 'react';
import { connect } from 'react-redux';
import DriverData from './DriverSummary/DriverData';
import Ratings from './Ratings/Ratings';
import * as actions from '../../store/actions/authActions';

class DriverPortal extends Component {

    componentDidMount() {
        this.props.onDriverBalanceGet(this.props.id, this.props.driverActiveStatus);
        this.props.onDriverInfoGet(this.props.id, this.props.ref);
        this.props.onDriverRatingGet(this.props.id);
    }
    paymentPageChanger = () => {
        this.props.history.push("/payment");
    }
    transactionHistoryPage = () => {
        this.props.history.push("/transaction-history");
    }

    render() {

        return (
            <div>
                <DriverData
                    clicked={this.paymentPageChanger}
                    transactionClicked={this.transactionHistoryPage}
                    lastTrans={this.props.driver.last_payment_date}
                    active={this.props.driverActiveStatus}
                    balance={this.props.earning}
                    id={this.props.driver.ref}
                    title={this.props.driver.name} />
                <Ratings
                    meanRating={this.props.avgRating}
                    timesRated={this.props.noOfRatings}
                    counts={this.props.countsObj}
                />

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        earning: state.earnings,
        driver: state.driver,
        // transactionDetail: state.transaction,
        id: state.driverId,
        driverActiveStatus: state.driverStatus,
        avgRating: state.avgRating,
        noOfRatings: state.noOfTimesRated,
        countsObj: state.counts
    }
}
const mapActionToProps = (dispatch) => {
    return {
        onDriverInfoGet: (id) => { dispatch(actions.driverDataGet(id)) },
        onDriverBalanceGet: (id, driStatus) => { dispatch(actions.driverBalanceGet(id, driStatus)) },
        onDriverRatingGet: (id) => { dispatch(actions.ratingDataGet(id)) }
    }
}

export default connect(mapStateToProps, mapActionToProps)(DriverPortal);