import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import Backdrop from '../../UI/BackDrop/Backdrop';
import Aux from '../../../hoc/AuxFile'
import NavigationItemsBelow from '../NavigationItemsBelow/NavigationItemsBelow';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return <Aux>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')}>
            <nav>
                <NavigationItems isAuth={props.isAuthenticated} />
                <NavigationItemsBelow />
            </nav>
        </div>
    </Aux>
}

export default sideDrawer;