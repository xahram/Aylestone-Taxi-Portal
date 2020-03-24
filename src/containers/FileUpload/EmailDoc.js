import React, { Component } from 'react';
import classes from './EmailDoc.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import Aux from '../../hoc/AuxFile';
import ToastContainer from '../../components/UI/Toaster/Toaster'

class EmailDoc extends Component {
    state = {
        queryForm: {
            driverId: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your DriverId',
                    name: 'from_name'
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
                    placeholder: 'Enter Your email',
                    name: 'reply_to'
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
        formIsValid: false,
        selectedFile: null
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

    onChangeHandler = (event) => {
        console.log(event.target.files[0])
        this.setState({ selectedFile: event.target.files[0] })
    }
    dummySubmitHandler = (e) => {
        // const data = new FormData();
        // data.append('file', this.state.selectedFile)
        e.preventDefault();
        console.log(e.target.id)
        const form = document.createElement("form");
        form.setAttribute('method', "post");
        // var x = document.createElement("INPUT");
        // x.type = "file";
        // x.name = "my_file"
        // x.value = this.state.selectedFile
        // form.appendChild(x)
        form.append('from_name', this.state.queryForm.driverId.value);
        form.append('reply_to', this.state.queryForm.email.value);
        form.append('file', this.state.selectedFile, 'myfile');
        console.log(form);
        emailjs.sendForm('110800922553936666849', 'template_qPNckx6d', ".myForm", 'user_bFBTn4x2afvCMOcyHBdf8').then((res) => {
            if (res.status == 200) {
                toast.success("Document Was Successfully Uploaded, You will hear shortly from us on mail")
                console.log('SUCCESS!', res.status, res.text);
            } else {
                toast.error("Some Error Occurred, Make Sure Document is Under 2MB Try Again..." + res.text);
            }
        }, (err) => {
            toast.error("Some Error Occurred, Make Sure Document is Under 2MB Try Again...")
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


        let form = <form className='myForm' enctype="multipart/form-data" onSubmit={this.dummySubmitHandler} type="submit">
            {
                formElementArray.map((formElement) => {
                    console.log(formElement.config.name)
                    return <Input
                        name={formElement.config.name}
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
            <div className={"form-group " + classes.files}>
                <label>Upload Your File </label>
                <input type="file" className="form-control" multiple="" name='file' onChange={this.onChangeHandler} />
            </div>
            <h6 style={{ color: "red" }}><strong>* Please Make Sure File Is Below 2MB</strong></h6>
            <Button
                disabled={!this.state.formIsValid}
                btnType="Success">Submit</Button>
        </form>


        return (<Aux>

            <div className={classes.EmailDoc}>
                <ToastContainer />
                <h2>Please Upload Your Documents Here</h2>
                {form}
            </div>

        </Aux>
        );
    }
}



export default EmailDoc;