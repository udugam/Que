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





class CueTable extends Component {
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
                        <CustomTableCell>Production Title</CustomTableCell>
                        <CustomTableCell >Type</CustomTableCell>
                        <CustomTableCell >Production Duration</CustomTableCell>
                        <CustomTableCell >Music Duration</CustomTableCell>
                        <CustomTableCell >Edit Cue</CustomTableCell>
                        <CustomTableCell >Download CSV</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.cueSheet.map(cueSheet => {
                        return (
                            <TableRow className={classes.row} key={cueSheet.id}>
                                <CustomTableCell component="th" scope="row">{cueSheet.productionTitle}</CustomTableCell>
                                <CustomTableCell>{cueSheet.type}</CustomTableCell>
                                <CustomTableCell>{cueSheet.productionDuration}</CustomTableCell>
                                <CustomTableCell>{cueSheet.musicDuration}</CustomTableCell>
                                <CustomTableCell><Button onClick={() => this.props.goToCue(cueSheet.id)}>Edit Cue</Button></CustomTableCell>
                                <CustomTableCell>
                                    <Button onClick={() => this.props.downloadCSVFile(cueSheet.productionTitle)}>
                                    <span class="material-icons MuiIcon-root-229 FileUpload-extendedIcon-186" aria-hidden="true">cloud_upload</span>
                                    </Button>
                                </CustomTableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Paper>
           </Fragment>
        )

    }

}
CueTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CueTable);
