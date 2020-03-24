import React, { Component } from 'react'
import classes from './Button.css'
import PropTypes from 'prop-types'

class Button extends Component {
    render() {
        // console.log(classes);
        return <button
            disabled={this.props.disabled}
            className={[classes.Button, classes[this.props.btnType]].join(' ')}
            onClick={this.props.clicked}>
            {this.props.children}
        </button>
    }

}
Button.propTypes = {
    btnType: PropTypes.string.isRequired
}

export default Button;