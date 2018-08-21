import React, {Fragment} from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer=(props)=>{
    let attachedClasses=[classes.Close,classes.SideDrawer];
    if (props.open){
         attachedClasses=[classes.Open,classes.SideDrawer];
    }
    return(
        <Fragment>
            <BackDrop
                clicked={props.sideDrawerHandler}
                show={props.open}
            />
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Fragment>
    )
};

export default sideDrawer;