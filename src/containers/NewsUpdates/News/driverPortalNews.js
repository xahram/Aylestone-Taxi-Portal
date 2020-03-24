import React from 'react';
import classes from './driverPortalNews.css'

const driverPortalNews = (props) => {
    return (
        <div className={classes.News}>
            <h1>Welcome to the driver portal</h1>
            <p><span>By <a href="/">Aylestone Taxis</a> | September 21, 2019 </span></p>

            <h3>The Aylesone Kings Taxis Driver Portal is now live!</h3>
            <p>Here are some of features and benefits of the portal:</p>


            <h3>Company News</h3>
            <p>The driver portal allows us to keep you up to date with everything that’s happening with Aylestone Taxis. When new company news is posted we will notify you and you can visit to read the article direct.</p>


            <h3>Invoice Payment</h3>
            <p>A quick and simple way to pay direct online with no need to visit the office.</p>

            <h3>Update Documents</h3>
            <p>No more driving to the office, parking up, wasting time and fuel, our driver portal allows you to update your documents from the comfort of your home 24 hours a day, 7 days a week. Once documents have been submitted they are approved by our team.</p>


            <h3>Deals</h3>
            <p>We are aiming to give more to the our drivers with the introduction of our driver deals. We are approaching businesses to offer you discounts and benefits for being part of Aylestone Taxis.</p>


            <h3>Forum</h3>
            <p>Our portal includes a company forum chat with other drivers, sell your vehicle or talk about any trade issues.</p>

            <h3>Trade News</h3>
            <p>We can keep you informed with things that’s happening in the trade to ensure you are in the know and if something is being implemented locally or around the country that affects you, you can read the story here.</p>

            <p>Thanks Aylestone Taxis</p>


        </div>
    );
}



export default driverPortalNews;