import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from '@material-ui/core'

class ModalEx extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        const { variant, classes, style } = this.props
        return (
            <div>
                <Button
                    variant={variant}
                    classes={classes}
                    data-id={this.props.dataId}
                    color={this.props.buttonColor}
                    style={style}
                    onClick={() => { this.props.toggle(this.props.modalStateName) }}>
                    {this.props.buttonName}
                </Button>

                <Modal
                    isOpen={this.props.modal}
                    toggle={this.props.modalToggle}
                    className={this.props.className}>
                    <ModalHeader
                        toggle={this.props.modalToggle}>
                        {this.props.modalHeader} 
                    </ModalHeader>
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

export default ModalEx