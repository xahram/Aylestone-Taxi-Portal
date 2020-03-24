import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../UI/Logo/Logo';
import logoImage from '../../../assets/images/logo-1.png';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler';

const toolbar = (props) => {
    return <header className={classes.Toolbar}>
        <Logo img={logoImage} width='30%' height="100%" />
        <DrawerToggler clicked={props.drawerTogglerClicked} />
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuthenticated} />
        </nav>
    </header>
}
export default toolbar;