import React from 'react';
import classes from './DriverInfo.css'
import Button from '../../../UI/Button/Button';
const driverInfo = (props) => {
    const style = {
        fontSize: '110%',
        color: 'green',
        paddingLeft: '2%'
    }
    return (
        <div className={classes.DriverInfo}>
            <h1>Driver is in {props.activeDeactive ? <span>Active State<span><i className="fa fa-bullseye" style={style}></i></span> </span> : <span>Deactivated State<span><i className="fa fa-bullseye" style={{ ...style, color: 'red' }}></i></span></span>}</h1>
            <h3>{props.id} : {props.title}</h3>
            <p><span> Balance : £{Number(props.balance)} </span></p>
            <p>Last transaction date<span> {props.transactionHistory} </span></p>
            <Button clicked={props.clicked} btnType='Success'>Make a Payment</Button>
            <Button clicked={props.transactionClicked} btnType='Success'>Transaction History</Button>
        </div>
    );
}



export default driverInfo;