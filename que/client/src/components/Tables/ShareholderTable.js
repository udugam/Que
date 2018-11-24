import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Table, 
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper, 
    Button, 
    Icon   
    } from '@material-ui/core'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});





class ShareholdersTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }
    }
   

    render() {
        const { classes,songId, confirmModal, confirmModalToggle, handleShareholderDelete } = this.props;
       
        return (
           <Fragment>
               <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow hover>
                        <CustomTableCell>Shareholder Name</CustomTableCell>
                        <CustomTableCell >Role</CustomTableCell>
                        <CustomTableCell numeric>Share %</CustomTableCell>
                        <CustomTableCell >Affiliation</CustomTableCell>
                        <CustomTableCell >Action</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.shareholders.map(shareholders => {
                        return (
                            <TableRow className={classes.row} key={shareholders.id}>
                                <CustomTableCell component="th" scope="row">
                                    {shareholders.shareholderName}
                                </CustomTableCell>
                                <CustomTableCell >{shareholders.shareholderSongs.role}</CustomTableCell>
                                <CustomTableCell numeric>{shareholders.shareholderSongs.shares}</CustomTableCell>
                                <CustomTableCell >{shareholders.affiliation}</CustomTableCell>
                                <CustomTableCell>
                                    <section>
                                        <Button  color="primary" mini onClick={() => { this.props.deleteShareholder(shareholders.id, songId) }} > 
                                        <Icon>delete </Icon></Button>
                                        <Modal isOpen={confirmModal} toggle={confirmModalToggle} className={this.props.className}>
                                            <ModalHeader toggle={confirmModalToggle}>Delete Shareholder</ModalHeader>
                                            <ModalBody>
                                                Are you sure you want to remove this shareholder?
                                                         </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={handleShareholderDelete}>Yes</Button>{' '}
                                                <Button color="secondary" onClick={confirmModalToggle}>Cancel</Button>
                                            </ModalFooter>
                                        </Modal>

                                    </section>
                                </CustomTableCell>

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
           </Fragment>
        )

    }

}
ShareholdersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShareholdersTable);
