import React from 'react';
import classes from './TransactionDate.css'
const transactionDate = (props) => {
    return (
        <div className={classes.Transaction}>
            <h2>Your Last Transaction Date Is Given Below</h2>
            <p>Last Transaction Date<span><strong>{props.transaction} </strong></span><span>{props.color}</span></p>
        </div>
    );
}



export default transactionDate;