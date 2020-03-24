import React from 'react';
import Aux from '../../../hoc/AuxFile';
import TradeNews1 from './TradeNews1';
import TradeNews2 from './TradeNews2';
import TradeNews3 from './TradeNews3';

const news = (props) => {
    return (
        <Aux>
            <TradeNews1 />
            <TradeNews2 />
		    <TradeNews3 />

        </Aux>
    );
}



export default news;