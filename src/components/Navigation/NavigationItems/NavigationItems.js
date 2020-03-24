import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {
    return <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Home</NavigationItem>
        <NavigationItem link='/vehicle-info' >Vehicle</NavigationItem>
        <NavigationItem link='/payment' >Payment</NavigationItem>
        <NavigationItem link='/edit-vehicle' >Edit_Vehicle</NavigationItem>
        <NavigationItem link='/contact-team' >Contact</NavigationItem>
        <NavigationItem link='/sign-out' >Signout</NavigationItem>


    </ul>
}
export default navigationItems;