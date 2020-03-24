import React from 'react';
import classes from './Logo.css';
const logo = (props) => {
    return <div className={classes.Logo}>
        <img width={props.width} height={props.height} src={props.img} alt='bus' />
    </div>
}

export default logo;