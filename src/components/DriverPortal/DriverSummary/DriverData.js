import React from 'react';
import DriverInfo from './DriverData/DriverInfo';
const driverData = (props) => {

    return (
        <div>
            <DriverInfo
                transactionClicked={props.transactionClicked}
                clicked={props.clicked}
                activeDeactive={props.active}
                balance={props.balance} id={props.id}
                title={props.title}
                transactionHistory={props.lastTrans} />
        </div>
    );
}


export default driverData;