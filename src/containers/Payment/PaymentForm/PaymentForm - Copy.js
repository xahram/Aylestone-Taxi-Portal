import React, { Component } from 'react';
import classes from './PaymentForm.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../Payment/PaymentForm/PaymentInput/Input';
import axios from '../../../axios-instance';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/authActions';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Modal from '../../../components/UI/Modal/Modal';
import Toaster from '../../../components/UI/Toaster/Toaster';
import { toast } from 'react-toastify'
class PaymentForm extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementTypeName: 'Full Name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Full Name'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 30
                }
            },
            driverId: {
                elementType: 'input',
                elementTypeName: 'Driver Id',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Driver Id'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: false,
                    minLength: 2,
                }
            },
            secretKey: {
                elementType: 'input',
                elementTypeName: 'Secret Key',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Driver Key'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: false,
                    minLength: 3
                }
            },

            funding: {
                elementType: 'input',
                elementTypeName: 'Enter Amount',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Credit Balance'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: false,
                    minLength: 1
                }

            },


            receiptEmail: {
                elementType: 'input',
                elementTypeName: 'Receipient Email',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your Receipt Email'
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
        formIsValid: false,
        show: false,
        alreadySent:false
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

    onSwitchShow = () => {
        this.setState({ show: false });
    }
    onPaymentHandler = async () => {
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }

        let { token } = await this.props.stripe.createToken(formData);
        let response = await fetch("/charge", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({ ...token, ...formData })
        });
        console.log(response)
        if (response.ok) {
            toast.success("Balance Successfully Charged");
            this.props.history.push("/");
        }
        else {
            // this.props.onError("Card wasn't accepted, Please Make Sure you have entered the right Credit Card Information");
            toast.error("Card wasn't accepted, Please Make Sure you have entered the right Credit Card Information")

        }
    }
    orderSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }


        axios.post(`https://cors-anywhere.herokuapp.com/https://api.icabbi.com/v2/transactions/driver/add?username=${formData.driverId}&password=${formData.secretKey}&amount=${formData.funding}&reference=${new Date().getTime()}`)
            .then((response) => {
                if (response.data.message) {
                    this.props.onError(response.data.message);
                } else {

                    axios.post(`https://cors-anywhere.herokuapp.com/https://api.icabbi.com/v2/drivers/update/`, { id: this.props.driver.id, last_payment_date: response.data.body.transaction.created })
                        .then((res) => {
                            this.props.onTransaction(response.data.body.transaction);
                            this.setState({ show: true });
                            // this.props.history.push("/");
                        }).catch((error) => {
                        })

                }

            }).catch((error) => {
                this.props.onError("Please Check your Internet Or Try Later");
            })



    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] }

        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.customValidation(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
        let formValidate = true;
        for (let key in updatedOrderForm) {
            formValidate = updatedOrderForm[key].valid && formValidate;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formValidate });
    }
    render() {

        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }


        let form = (
            <form onSubmit={this.orderSubmitHandler} type="submit">
                {
                    formElementArray.map((formElement) => {
                        return <Input
                            name={formElement.config.elementTypeName}
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
                <p className={classes.CardLabel}>Payment Detail</p>

                <Button
                    disabled={!this.state.formIsValid}
                    btnType="Success">Submit</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        let message = null
        if (this.props.error) {
            message = <p>{this.props.error} : Please Enter Right Info</p>
        }
        return (
            <div className={classes.ContactData}>
                <h2>Please Enter Your Payment Information</h2>
                {form}
                {message}
                <Modal show={this.state.show}>
                    <h2>Please Enter Your Credit Card Details</h2>
                    <Toaster />
                    <CardElement className={classes.Card} />
                    <Button
                        clicked={this.onPaymentHandler}
                        btnType="Success">Pay</Button>
                    <Button
                        clicked={this.onSwitchShow}
                        btnType="Danger">Go Back</Button>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.transactionError,
        driver: state.driver
    }
}
const mapActionToProps = (dispatch) => {
    return {
        onTransaction: (trans) => { dispatch(actions.transaction(trans)) },
        onError: (err) => { dispatch(actions.transactionError(err)) }
    }
}
export default connect(mapStateToProps, mapActionToProps)(injectStripe(PaymentForm));