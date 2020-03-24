import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import axios from '../../../axios-instance'

class ContactData extends Component {
    state = {
        orderForm: {
            model: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Vehicle Model'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 8
                }
            },
            make: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Vehicle Make'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: false,
                    minLength: 5
                }

            },
            colour: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Vehicle Colour'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: false,
                    minLength: 3
                }
            },
            year: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Vehicle Year'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: false,
                    minLength: 5
                }
            },
            insurer: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Vehicle Insurer'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: false,
                    minLength: 5
                }
            },
            reg: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Vechile Registration'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: false,
                    minLength: 5
                }
            },
            plate: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Vechile Plate'
                },
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: false,
                    minLength: 5
                }
            },
          

        },
        loading: false,
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

    componentDidMount() {
        if (!this.props.carId) {
            this.props.history.push("/");
        }
    }
    orderSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let key in this.state.orderForm) {
            if (this.state.orderForm[key].value !== '')
                formData[key] = this.state.orderForm[key].value
        }
       
        const vehicleData = { id: this.props.carId.id, ...formData }
        axios.post('https://cors-anywhere.herokuapp.com/https://api.icabbi.com/v2/vehicle/update', vehicleData)
            .then((response) => {
                this.setState({ loading: false });
                this.props.history.push("/");
            }).catch((error) => {
                this.setState({ loading: false });
            })
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] }

        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.customValidation(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
       
        this.setState({ orderForm: updatedOrderForm });
    }
    render() {

        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
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
                btnType="Success">Update</Button>
        </form>
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h2>Use This Form To Edit Your Vehicle Information</h2>
                {form}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        carId: state.vehicleData
    }
}
export default connect(mapStateToProps)(ContactData);