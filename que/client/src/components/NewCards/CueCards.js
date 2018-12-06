import React, { Component, Fragment } from 'react';
import { Container } from "../../components/Grid";

import {
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    MenuItem,
    Icon,
    Button,
    Popper,
    Grow,
    ClickAwayListener,
    MenuList
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        // textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: 40
    },
    card: {
        // padding: theme.spacing.unit * 2,
        // textAlign: 'center',
        // color: theme.palette.text.secondary,
        marginTop: 20
    },
    cardHeader: {
        background: '#f4511e',
        position: 'relative'
    },
    modifyButton: {
        position: 'absolute',
        right: '1px',
        top: '10px'
    }
});



class CueCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <Fragment>
                <Container>
                    <Grid container spacing={24}>
                        <Grid item xs={12} >

                            <Card className={classes.card}>

                                {/* <CardHeader
                                    className={classes.cardHeader}
                                    title={this.props.title}>

                                </CardHeader> */}
                                <CardContent className={classes.cardHeader}>
                                    <Typography variant='h6'>{this.props.title}</Typography>
                                    <Button
                                        buttonRef={node => {
                                            this.anchorEl = node;
                                        }}
                                        // component="span"
                                        className={classes.modifyButton}
                                        aria-owns={open ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleToggle}
                                    >
                                        <Icon className={classes.extendedIcon}
                                        >menu</Icon>

                                    </Button>
                                    <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                id="menu-list-grow"
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={this.handleClose}>
                                                        <MenuList>
                                                            <MenuItem onClick={() => { this.props.editCue(this.props) }}>Edit</MenuItem>
                                                            <MenuItem onClick={() => { this.props.deleteCue(this.props.cueId) }}>Delete</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                    <div>

                                        {/* <IconButton
                                            aria-label="More"
                                            // aria-owns={open ? 'long-menu' : undefined}
                                            aria-haspopup="true"
                                            onClick={this.handleClick}
                                        >
                                          edit
                                        </IconButton> */}

                                    </div>

                                </CardContent>

                                <CardContent data-songid={this.props.songId}>
                                    <Typography variant='body1'>
                                        <span style={{ color: '#757575' }}> Artist(s): </span>
                                        {this.props.artists}</Typography>

                                    <Typography
                                        variant='body1'
                                    > <span style={{ color: '#757575' }}> Duration: </span>
                                        {this.props.duration}</Typography>

                                    <Typography
                                        variant='body1'
                                    > <span style={{ color: '#757575' }}> Usage:  </span>
                                        {this.props.usage}</Typography>

                                  

                                </CardContent>

                                <CardContent style={{padding:'0px'}}>
                                    {this.props.children}
                                </CardContent>



                            </Card>

                        </Grid>
                    </Grid>

                </Container>

            </Fragment>
        )

    }

}

export default withStyles(styles)(CueCards)