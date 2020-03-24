import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toaster = (props) => {
    return (
        <div className="form-group">
            <ToastContainer />
        </div>
    );
}
export default toaster;