import React, { Component } from 'react';
import { connect } from "react-redux";
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button';
import * as actions from "../../store/actions/authActions";
import taxiBackground from '../../assets/images/image1.png';

import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
   
    state = {
        controls: {

            email: {
                elementType: 'input',
                textFieldName: 'Driver No',
                elementConfig: {
                    type: 'text',
                    placeholder: "Driver No"
                },
                validation: {
                    isRequired: true,
                    minLength: 2,
                    maxLength: 20
                },
                value: "",
                touched: false,
                valid: false,
            },
            password: {
                elementType: 'input',
                textFieldName: 'Secret Key',
                elementConfig: {
                    type: 'password',
                    placeholder: "Enter Secret Key"
                },
                validation: {
                    isRequired: true,
                    minLength: 2,
                    maxLength: 20
                },
                value: "",
                touched: false,
                valid: false
            },

        },
        isSignUp: true
    }

    componentDidMount() {

    }
    customValidation = (value, validations) => {
        let isValid = true;
        if (validations.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (validations.minLength) {
            isValid = value.length >= validations.minLength && isValid;
        }
        if (validations.maxLength) {
            isValid = value.length <= validations.maxLength && isValid;
        }

        return isValid;
    }
    
    submitHandler = (e) => {
        e.preventDefault();
        this.props.switchAuthModeHandler(this.state.controls.email.value, this.state.controls.password.value);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = { ...this.state.controls }
        const updatedElement = { ...updatedForm[inputIdentifier] }
        updatedElement.value = event.target.value;
        updatedElement.valid = this.customValidation(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;

        updatedForm[inputIdentifier] = updatedElement
        this.setState({ controls: updatedForm });
    }
   

    render() {
        const styleSection = {
            backgroundImage: `url(${taxiBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
		 
        }
     

        const formElements = []
        for (const key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElements.map((formElement) => {
            return <Input
                name={formElement.config.textFieldName}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                key={formElement.id}
                validity={formElement.config.validation}
                touch={formElement.config.touched}
                isValid={!formElement.config.valid}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value} />
        })

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null

        if (this.props.error) {
            errorMessage = <p>Please Enter Right Driver No And Secret Key</p>
        }
        return (
            <div style={styleSection} className={classes.Auth}>
			
			<h2>AYLESTONE TAXIS</h2>
			<p><h3>DRIVER PORTAL </h3></p>
			
                <form className={classes.Form} onSubmit={this.submitHandler}>
                    {form}
                    {errorMessage}
                    <Button btnType="Success">LOGIN</Button> 
                </form>
            </div>
        );
    }
}



const mapActionsToProps = (dispatch) => {
    return {
        switchAuthModeHandler: (email, password) => { dispatch(actions.authActionGet(email, password)) },
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        loading: state.loading
    }
}


export default connect(mapStateToProps, mapActionsToProps)(Auth);