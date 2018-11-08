import React, { Component } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

    class ModalNb extends Component {
        constructor(props) {
            super(props);
            this.state = {

            };
        };

        render(){
            return(
                <div>
                         
                            <Modal isOpen={this.props.modal} toggle={this.props.modalToggle} className={this.props.className}>
                                <ModalHeader toggle={this.props.modalToggle}>{this.props.modalHeader} </ModalHeader>
                                <ModalBody>
                                    {this.props.children}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => { this.props.handleSubmit() }}> {this.props.actionButton} </Button>{' '}
                                    <Button color="secondary" onClick={() => { this.props.toggle(this.props.modalStateName) }}> {this.props.cancelButton} </Button>
                                </ModalFooter>
                            </Modal>
                </div>
            )
        }
    }

        export default ModalNb