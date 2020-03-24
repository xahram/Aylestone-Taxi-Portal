import React, { Component } from 'react';
import News from './News/News';
class TradeNews extends Component {
    state = {
        news: []
    }
    render() {
      
        return (
            <div>
                <News />
            </div>
        );
    }
}

export default TradeNews;