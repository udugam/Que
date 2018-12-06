import React, {Component} from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = theme =>({
    text:{
        color: theme.palette.primary.contrastText
    }
})

export default withStyles(styles)(class WelcomeMessage extends Component {
    render() {
        const messageStyle = {
            width: '30vw',
            height: '30vh',
            position: 'fixed',
            top: '30vh',
            left: '35vw',
            textAlign: 'center'
        }
        const {classes} = this.props

        return(
            <div style={messageStyle}>
                <Typography variant='h1' className={classes.text}>
                    Que
                </Typography>
                <Typography variant='h3' className={classes.text}>
                    Generate Your QueSheets Faster
                </Typography>
            </div>
        )
    }
})