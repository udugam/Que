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
    Icon,
    Button, 
    } from '@material-ui/core'
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

const actionsStyles = theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5,
    },
  });
  
  class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
      this.props.onChangePage(event, 0);
    };
  
    handleBackButtonClick = event => {
      this.props.onChangePage(event, this.props.page - 1);
    };
  
    handleNextButtonClick = event => {
      this.props.onChangePage(event, this.props.page + 1);
    };
  
    handleLastPageButtonClick = event => {
      this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
      );
    };
  
    render() {
      const { classes, count, page, rowsPerPage, theme } = this.props;
  
      return (
        <div className={classes.root}>
          <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      );
    }
  }
  
  TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
  );
  
  let counter = 0;
  function createData(name, calories, fat) {
    counter += 1;
    return { id: counter, name, calories, fat };
  }

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
    tableWrapper: {
        overflowX: 'auto',
    },
    paper: {
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        margin: 'auto',
    }
});

class CueTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            rowsPerPage: 5,
            deleteOpen: false
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    
    handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    };

    handleDeleteOpen = () => {
        this.setState({ deleteOpen: true });
    };

    handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
    };
   
    render() {
        const { classes} = this.props;
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.props.cueSheet.length - this.state.page * this.state.rowsPerPage);
       
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
                                <CustomTableCell >Delete</CustomTableCell>
                                <CustomTableCell >Download CSV</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.cueSheet.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(cueSheet => {
                                return (
                                    <TableRow className={classes.row} key={cueSheet.id}>
                                        <CustomTableCell component="th" scope="row">{cueSheet.productionTitle}</CustomTableCell>
                                        <CustomTableCell>{cueSheet.type}</CustomTableCell>
                                        <CustomTableCell>{cueSheet.productionDuration}</CustomTableCell>
                                        <CustomTableCell>{cueSheet.musicDuration}</CustomTableCell>
                                        <CustomTableCell>
                                            <Button onClick={() => this.props.goToCue(cueSheet.id)}>
                                                <Icon>edit</Icon>
                                            </Button>
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            <Button onClick={() => {this.handleDeleteOpen()}}>
                                                <span className="material-icons MuiIcon-root-229 FileUpload-extendedIcon-186" aria-hidden="true">delete</span>
                                            </Button>
                                            <Modal 
                                                aria-labelledby="simple-modal-title"
                                                aria-describedby="simple-modal-description"
                                                open={this.state.deleteOpen}
                                                onClose={this.handleDeleteClose}
                                            >
                                                <div className={classes.paper}>
                                                    <Typography variant="h6" id="modal-title">
                                                        Are you sure you want to delete this Que
                                                    </Typography >
                                                    <Button 
                                                        onClick={() => {this.handleDeleteClose(); this.props.deleteCue(cueSheet.id)}} 
                                                    >
                                                        Yes
                                                    </Button>
                                                    <Button onClick={() => {this.handleDeleteClose()}}>No</Button>
                                                </div>
                                            </Modal>
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            <Button onClick={() => this.props.downloadCSVFile(cueSheet.productionTitle)}>
                                                <span className="material-icons MuiIcon-root-229 FileUpload-extendedIcon-186" aria-hidden="true">cloud_download</span>
                                            </Button>
                                        </CustomTableCell>
                                    </TableRow>
                                )
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                                </TableRow>
                            )}  
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                colSpan={3}
                                count={this.props.cueSheet.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
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
