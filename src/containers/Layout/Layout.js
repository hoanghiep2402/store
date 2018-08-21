import React,{Fragment,Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
      openSideDrawer:false
    };
    sideDrawerClosed=()=>{
      this.setState({
          openSideDrawer: false
      })
    };
    sideDrawerHandler=()=>{
      this.setState((prevState)=>{
            return {openSideDrawer: !prevState.openSideDrawer}
      })
    };

    render() {
        return (
            <Fragment>
                <SideDrawer
                    sideDrawerHandler={this.sideDrawerClosed}
                    open={this.state.openSideDrawer}
                />
                <Toolbar drawerToggleClicked={this.sideDrawerHandler}/>

                <main className={classes.Content}>
                    {this.props.children}
                </main>

            </Fragment>
        );
    }

}



export default Layout;