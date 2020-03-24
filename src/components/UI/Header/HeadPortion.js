import React from 'react';
import classes from './HeadPortion.css'
import Aux from '../../../hoc/AuxFile';
import NavigationItemsBelow from '../../Navigation/NavigationItemsBelow/NavigationItemsBelow'
const headPortion = (props) => {
    return (<Aux>
        <div className={classes.HeadPortion}>
            <h2>Driver Portal</h2>
        </div>
        <div className={classes.Toolbar}>
            <nav className={classes.DesktopOnly}>
                <NavigationItemsBelow  />
            </nav>
        </div>
    </Aux>
    );
}

export default headPortion;