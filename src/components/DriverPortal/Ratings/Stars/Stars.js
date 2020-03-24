import React from 'react';
import classes from './Stars.css'
import AuxFile from '../../../../hoc/AuxFile';
const stars = (props) => {

    const starArray = new Array(props.starCount).fill(0);
    const starRating = starArray.map((key, i) => {
        return <i className={`fa fa-star ${classes.MyStars}`}></i>
    })

    return (<AuxFile>
        <p className={classes.MarginRemover}>
            {starRating}
            <span > = {props.ratingBreakdown}</span>
        </p>
    </AuxFile>
    );
}

export default stars;