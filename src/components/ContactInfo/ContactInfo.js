import React from 'react';
import classes from './ContactInfo.css';
import instagramImg from '../../assets/images/instagram-2433265_1280.png';
import twitterImg from '../../assets/images/twitter-2430933_1280.png';
import facebookImg from '../../assets/images/facebook-2429746_1280.png';

const contactInfo = (props) => {
    return (
        <div className={classes.ContactInfo}>
            <h2>Official Aylestone Kings Taxis Contacts</h2>
            <p><span><strong>Owner : </strong></span><span>Afraz Khan</span></p>
            <p><span><strong>Email : </strong></span><span>info@aylestone-taxis.co.uk</span></p>
            <p><span><strong>Phone : </strong></span><span>01162338888</span></p>
            <h3>Connect With Us On Social Sites</h3>
            <nav className={classes.NavImg}>
                <div> <a href="https://www.facebook.com" target="_blank"><img src={facebookImg} alt='facebook' /></a></div>
                <div> <a href="https://twitter.com/aylestonetaxis?lang=en-gb" target="_blank"><img src={twitterImg} alt='twitter' /></a></div>
                <div> <a href="https://www.instagram.com/aylestone_kings/" target="_blank"><img src={instagramImg} alt='instagram' /></a></div>
             
            </nav>
        </div>
    );
}

export default contactInfo