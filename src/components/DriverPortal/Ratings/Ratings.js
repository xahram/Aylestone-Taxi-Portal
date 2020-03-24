import React from 'react';
import classes from './Ratings.css'
import Stars from './Stars/Stars';
const ratings = (props) => {
    return (<div className={classes.Ratings}>
        <div>
            <p>Your Average Rating</p>
            <span>{props.meanRating}</span>
            <i className={`fa fa-star ${classes.fa_custom} fa-2x`}></i>
        </div>
        <div>
            <p>Number Of Rating</p>
            <span>{props.timesRated}</span>
        </div>
        <div>
            <p>Rating Breakdown</p>
            <Stars ratingBreakdown={props.counts[5] ? props.counts[5] : 0} starCount={5} />
            <Stars ratingBreakdown={props.counts[4] ? props.counts[4] : 0} starCount={4} />
            <Stars ratingBreakdown={props.counts[3] ? props.counts[3] : 0} starCount={3} />
            <Stars ratingBreakdown={props.counts[2] ? props.counts[2] : 0} starCount={2} />
            <Stars ratingBreakdown={props.counts[1] ? props.counts[1] : 0} starCount={1} />
        </div>
    </div>);
}

export default ratings;