import React from 'react';
import classes from './Vehicle.css'
const vehicle = (props) => {
    return (
        <div className={classes.Earnings}>
            <h2>Vehicle Information</h2>
            <p><span><strong>Color : </strong></span><span>{props.color}</span></p>
            <p><span><strong>Insurer : </strong></span><span>{props.insurer}</span></p>
            <p><span><strong>Year : </strong></span><span>{props.year}</span></p>
            <p><span><strong>Registration : </strong></span><span>{props.reg}</span></p>
            <p><span><strong>Number Plate End Date: </strong></span><span>{props.hireExpiry}</span></p>
            <p><span><strong>Number Plate Start Date :</strong> </span><span>{props.plateExpiry}</span></p>
            <p><span><strong>Car : </strong></span><span>{props.make}</span></p>
            <p><span><strong>Model : </strong></span><span>{props.model}</span></p>
        </div>
    );
}



export default vehicle;