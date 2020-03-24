import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Vehicle from './Vehicle/Vehicle';

class DriverPortal extends Component {

    componentDidMount() {
    }
    render() {
        let vehicle = <Redirect to="/" />
        if (this.props.vehicle) {
            vehicle = <Vehicle
                color={this.props.vehicle.colour}
                insurer={this.props.vehicle.insurer}
                year={this.props.vehicle.year}
                reg={this.props.vehicle.reg}
                plateExpiry={this.props.vehicle.plate_expiry}
                hireExpiry={this.props.vehicle.hire_expiry}
                make={this.props.vehicle.make}
                model={this.props.vehicle.model} />
        }
        return (
            <div>
                {vehicle}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        vehicle: state.vehicleData,
        id: state.driverId,
    }
}


export default connect(mapStateToProps)(DriverPortal);