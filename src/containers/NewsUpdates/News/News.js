import React from 'react';
import classes from './News.css'

import Aux from '../../../hoc/AuxFile';
const news = (props) => {
    return (
        <Aux>
            <div className={classes.News}>
                <h1>{props.headline}</h1>
                <p><span>By <a href='/'>{props.author}</a> | {props.datePosted} : </span>{props.headline}</p>
                <p>{props.description}</p>
            </div>
            </Aux>
    );
}



export default news;