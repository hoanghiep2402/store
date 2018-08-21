import React, {Component, Fragment} from 'react';

import Modal from '../components/UI/Modal/Modal';

const withErrorHandler=(WrappedComponent,axios)=>{
    return class extends Component{
            state={
                error:null
            };
            componentWillMount(){
                axios.interceptors.response.use(res=>res,error => {
                    this.setState({error:error})
                });
                axios.interceptors.request.use(req=> {
                    this.setState({error:null});
                    return req;
                });
            }
            modalClosed=()=>{
              this.setState({error:null})
            };
        render() {
            let {error}=this.state;
            return (
                <Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.modalClosed}
                    >
                        {error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>

            );
        }

    }
};


export default withErrorHandler;