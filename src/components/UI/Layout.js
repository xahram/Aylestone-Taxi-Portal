import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from "react-redux";
import Aux from '../../hoc/AuxFile';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import HeadPortion from './Header/HeadPortion';
import Auth from '../../containers/Auth/Auth';

class Layout extends Component {

    state = {
        showSideDrawer: false,
        isAuthenticated: false
    }

    switchAuthHandler = (e) => {
        
        this.setState({
            isAuthenticated: true
        })
    }
    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer } })
    }

    render() {
        let app = <Route path="/" render={() => { return <Auth clicked={this.switchAuthHandler} /> }} />
        if (this.props.isAuthenticated) {
            app = (<Aux>
                <Toolbar
                    drawerTogglerClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler} />
                <div className={classes.Margining}>
                    <HeadPortion />
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux >
            );
        }
        return <Aux>
            {app}
        </Aux >
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(Layout);
