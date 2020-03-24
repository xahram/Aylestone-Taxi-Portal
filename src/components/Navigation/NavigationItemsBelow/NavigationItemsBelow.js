import React from 'react'
import classes from './NavigationItemsBelow.css'
import NavigationItemBelow from './NavigationItemBelow/NavigationItemBelow';


const navigationItemsBelow = (props) => {
    return <ul className={classes.NavigationItems}>
        <NavigationItemBelow link='/news' >Company News </NavigationItemBelow>
        <NavigationItemBelow link='/trade' >Taxi Rules</NavigationItemBelow>
        <NavigationItemBelow link='/file-upload' >Upload Doc</NavigationItemBelow>
        <NavigationItemBelow link='/query' >Ask Question</NavigationItemBelow>


    </ul>
}
export default navigationItemsBelow;