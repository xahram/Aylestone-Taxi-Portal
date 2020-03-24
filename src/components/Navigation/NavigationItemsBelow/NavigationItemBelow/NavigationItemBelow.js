import React from 'react'
import classes from './NavigationItemBelow.css'
import { NavLink } from 'react-router-dom';

const navigationItemBelow = (props) => {
    return <li className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>

}
export default navigationItemBelow;