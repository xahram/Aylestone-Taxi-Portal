import React, { Component } from 'react';
import classes from './FileUpload.css'
import axios from '../../axios-local';
import ToastContainer from '../../components/UI/Toaster/Toaster'
import { toast } from 'react-toastify';

class FileUpload extends Component {
    state = {
        selectedFile: null
    }
    onChangeHandler = (event) => {
        console.log(event.target.files[0])
        this.setState({ selectedFile: event.target.files[0] })
    }
    onClickHandler = () => {
        const data = new FormData();
        data.append('file', this.state.selectedFile)
        axios.post('/upload', data)
            .then((res) => {
                if (res.status == 200) {
                    toast.success("File Uploaded SuccessFully...")
                    console.log(res.status, res.statusText)
                }
            })
            .catch((err) => {
                toast.error("Couldn't Upload The File Make Sure File Is Under 2mb... Try Again." + err.statusText)
                console.log(err)
            })
    }
    render() {
        return (<div className="container" >
            <div className="row">
                <div className="col-md-6">
                    <form method="post" action="#" id="#">
                        <div className={"form-group " + classes.files}>
                            <label><strong> Submit Your Documents </strong> </label>
                            <input type="file" className="form-control" multiple="" onChange={this.onChangeHandler} />
                        </div>
                        <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
        );

    }
}

export default FileUpload