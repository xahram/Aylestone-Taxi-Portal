import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/authActions';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }
    render() {
        return (
            <Redirect to="/" />
        )
    }
}


const mapActionsToProps = (dispatch) => {
    return {
        onLogout: () => { return dispatch(actions.logout()) }
    }
}
export default connect(null, mapActionsToProps)(Logout);