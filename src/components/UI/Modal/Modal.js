import React, {Fragment,Component} from 'react';
import classes from  './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show!==this.props.show || nextProps.children!==this.props.children;
    }
    render() {
        let modalClass = [classes.Modal, classes.close].join(' ');
        if (this.props.show) {
            modalClass = [classes.Modal, classes.show].join(' ');
        }
            return (
                <Fragment>
                    <Backdrop
                        show={this.props.show}
                        clicked={this.props.modalClosed}
                    />
                    <div className={modalClass}>
                        {this.props.children}
                    </div>
                </Fragment>
            );
        }


    }


export default Modal;