import React, { Component, Fragment } from 'react';
import { Container } from "../../components/Grid";

import {
    Grid,
    // Paper,
    Typography,
    // ListItemSecondaryAction,
    // IconButton,
    Card,
    CardHeader,
    CardContent
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
        marginTop: 40
    },
    cardHeader: {
        background: theme.palette.primary.light, //'#f4511e'
       // color:'#FAFAFA'
    },
    title:{
        color: theme.palette.primary.contrastText
    }
});



class ProductionCard extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        const { classes } = this.props;
        return (
            <Fragment>
            <Container>
            <Grid container spacing={24}>
                            <Grid item xs={12} >
                                {/* <Paper className={classes.paper}>
                                <Typography
                                variant="h6" gutterBottom
                                >{this.state.cueSheet.productionTitle}</Typography>
                                 <hr></hr>
                            
                                </Paper> */}
                                <Card className={classes.card}>
                                    
                                    <CardHeader 
                                    className={classes.cardHeader}
                                    title={this.props.productionTitle}
                                    classes={{
                                        title:classes.title
                                    }}>
                                    
                                    </CardHeader>
                                    
                                   <CardContent>
                                       <Typography variant='body1'>
                                       <span style={{color:'#757575'}}> Episode Title: </span>  </Typography>
    
                                       <Typography
                                        variant='body1'
                                       > <span style={{color:'#757575'}}> Production Year: </span> 
                                       {this.props.productionYear}</Typography>
    
                                         <Typography
                                        variant='body1'
                                       > <span style={{color:'#757575'}}> Production Duration:  </span> 
                                       {this.props.productionDuration}</Typography>
    
                                    <Typography
                                        variant='body1'
                                       > <span style={{color:'#757575'}}> Music Duration:  </span> 
                                       {this.props.musicDuration} </Typography>
                                      
                                   </CardContent>
        
                                   <CardContent>
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

export default withStyles(styles)(ProductionCard)