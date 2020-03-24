import React from 'react';
import classes from './Earnings.css'
import Button from '../../../UI/Button/Button';
const earnings = (props) => {
    return (
        <div className={classes.Earnings}>
            <h3>Earning Information</h3>
            <p><span> Last Week: $388.50 </span> <span> This Week: $508.50 </span> </p>
            <Button btnType="Success">Read More</Button>
        </div>
    );
}



export default earnings;