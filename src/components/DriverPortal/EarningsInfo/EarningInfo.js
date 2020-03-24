import React, { Component } from 'react';
import Earnings from './Earnings/Earnings';
class EarningInfo extends Component {
    state = {
        earning: {}
    }
    componentDidMount() {
     

    }
    render() {
        return (
            <div>
                <Earnings />
            </div>
        );
    }
}



export default EarningInfo;