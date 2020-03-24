import React, { Component } from 'react';
import classes from './Query.css';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import * as emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import Aux from '../../hoc/AuxFile';
import ToastContainer from '../../components/UI/Toaster/Toaster'

class Query extends Component {
    state = {
        queryForm: {
            driverId: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your DriverId'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 1,
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your email'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: false,
                    minLength: 5
                }

            },
            query: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Query'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: false,
                    minLength: 3
                }
            },

        },
        loading: false,
        formIsValid: false
    }
    customValidation(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }


    orderSubmitHandler = (e) => {
        e.preventDefault();
        const formData = {};
        for (let key in this.state.queryForm) {
            formData[key] = this.state.queryForm[key].value
        }
        let templateParams = {

            // to_name: 'ssasuke1164@gmail.com',
            from_name: this.state.queryForm.driverId.value,
            to_name: "Aylestone Kings Taxis",
            message_html: this.state.queryForm.query.value,
            reply_to: this.state.queryForm.email.value

        }
        emailjs.send('110800922553936666849', 'template_qPNckx6d', templateParams, 'user_bFBTn4x2afvCMOcyHBdf8')
            .then((response) => {
                if (response.status == 200) {
                    toast.success("Email Successfully Sent, You will hear shortly from us on mail")
                    console.log('SUCCESS!', response.status, response.text);
                } else {
                    toast.error("Some Error Occurred Try Again..." + response.text);
                }
            }, (err) => {
                toast.error("Some Error Occurred Try Again...")
                console.log('FAILED...', err);
            });

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.queryForm };
        const updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] }

        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.customValidation(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
        let formValidate = true;
        for (let key in updatedOrderForm) {
            formValidate = updatedOrderForm[key].valid && formValidate;
        }
        this.setState({ queryForm: updatedOrderForm, formIsValid: formValidate });
    }
    render() {

        const formElementArray = [];
        for (let key in this.state.queryForm) {
            formElementArray.push({
                id: key,
                config: this.state.queryForm[key]
            });
        }


        let form = <form onSubmit={this.orderSubmitHandler} type="submit">
            {
                formElementArray.map((formElement) => {
                    return <Input
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        key={formElement.id}
                        validity={formElement.config.validation}
                        touch={formElement.config.touched}
                        isValid={!formElement.config.valid}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} />
                })
            }
            <Button
                disabled={!this.state.formIsValid}
                btnType="Success">Submit</Button>
        </form>
        if (this.state.loading) {
            form = <Spinner />
        }

        return (<Aux>

            <div className={classes.Query}>
                <ToastContainer />
                <h2>Send us your Query.</h2>
				<h3>Our team will get back to you soon. </h3>
                {form}
            </div>

        </Aux>
        );
    }
}



export default Query;