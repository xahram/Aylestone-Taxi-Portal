import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputField = null;
    const inputClasses = [classes.InputElement];
    if (props.isValid && props.validity && props.touch) {
        inputClasses.push(classes.IsValid);
    }
    switch (props.elementType) {
        case "input":
            inputField = <input onChange={props.changed}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value} />
            break;

        case "textarea":
            inputField = <textarea onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} />
            break;

        case "select":
            inputField = <select onChange={props.changed}
                className={inputClasses.join(' ')}
                value={props.value} >
                {props.elementConfig.options.map((opt) => {
                    return <option key={opt.value}
                        value={opt.value}>
                        {opt.displayValue}
                    </option>
                })}
            </select>
            break;

        default:
            inputField = <input onChange={props.changed}
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value} />
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.name}</label>
            {inputField}
        </div>
    );
}

export default input;