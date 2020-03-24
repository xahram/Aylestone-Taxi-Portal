import React, { Component } from 'react';
import News from './News/News';
import DriverPortalNews from './News/driverPortalNews';
import Aux from '../../hoc/AuxFile';
class NewsUpdates extends Component {
    state = {
        news: [
            {
                headline: 'Aylestone Kings Taxis',
                author: 'Aylestone Taxis',
                description: 'Drivers Portal',
                datePosted: "Wed September 19, 2019"
            },


        ]
    }
    render() {
        const news = this.state.news.map((oneNews) => {
            return <News
                headline={oneNews.headline}
                author={oneNews.author}
                description={oneNews.description}
                datePosted={oneNews.datePosted} />
        })
        return (<Aux>
            <div>
                {news}
            </div>
            <DriverPortalNews />
        </Aux>
        );
    }
}

export default NewsUpdates;