import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './Navigationitems.css';

const navigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem
            link="/"
        >
            Link 1
        </NavigationItem>
        <NavigationItem
            link="/"
        >
            Link 2
        </NavigationItem>
    </ul>
);

export default navigationItems;