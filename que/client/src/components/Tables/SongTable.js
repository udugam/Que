import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table, 
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  Paper, 
  Button, 
  } from '@material-ui/core'
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import API from "../../utils/API"

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
  button: {
      color: "white"
  },
  column: {
      flexBasis: '33.33%',
  },
  heading: {
      fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
  fontSize: theme.typography.pxToRem(15),
  color: theme.palette.text.secondary,
  },
  tableWrapper: {
      overflowX: 'auto',
  },
});

class CueTable extends React.Component {
  state = {
    modalDetail: {},
    shareholders: [],
    rows: [],
    page: 0,
    rowsPerPage: 5,
  };

  componentDidMount(){
    this.getSongInfo();
}

  getSongInfo(){
    API.getSongs(this.state.email)
      .then(data => {
          this.setState({ shareholders: data.data[0], rows : data.data[1]}, () => {
              this.shareInfo()
          })
      })
  }

  shareInfo(){
    var index = [];
    this.state.rows.forEach(song => {
        index.push(this.state.shareholders.findIndex(share => {
            return share.song.id === song.id
        }))
    })
    var songShare = {}

    for(var i = 0; i < this.state.rows.length; i++){
        songShare[this.state.rows[i].id] = []

        if(index[i] >= 0){
            this.state.shareholders[index[i]].song.shareholders.forEach(element => {
                var info = {
                    id: element.id,
                    shareholderName: element.shareholderName,
                    shares: element.shareholderSongs.shares,
                    role: element.shareholderSongs.role,
                    affiliation: element.affiliation,
                }
                songShare[this.state.rows[i].id].push(info)
            })
        }
    }
    this.setState({modalDetail: songShare})
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
                <TableRow hover>
                  <CustomTableCell>Song Title</CustomTableCell>
                  <CustomTableCell >Artist</CustomTableCell>
                  <CustomTableCell >Shareholder Details</CustomTableCell>
                </TableRow>
              </TableHead>
          </Table>
          <Table className={classes.table}>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <ExpansionPanel className={classes.row} key={row.id} >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <div className={classes.column}>
                        <Typography className={classes.heading}>{row.songTitle}</Typography>
                      </div>
                      <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>{row.artists}</Typography>
                      </div>                 
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow hover>
                              <CustomTableCell>Name</CustomTableCell>
                              <CustomTableCell >Shares(%)</CustomTableCell>
                              <CustomTableCell >Role</CustomTableCell>
                              <CustomTableCell >Affiliation</CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.modalDetail[row.id]? (
                              
                              this.state.modalDetail[row.id]
                                  .map(element => {
                                  return(
                                      <TableRow key={element.id}>
                                          <TableCell>{element.shareholderName}</TableCell>
                                          <TableCell>{element.shares}</TableCell>
                                          <TableCell>{element.role}</TableCell>
                                          <TableCell>{element.affiliation}</TableCell>
                                      </TableRow>
                                  )
                              })
                          ) : (
                              <tr></tr>
                          )}
                        </TableBody>
                      </Table>
                      
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

CueTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CueTable);