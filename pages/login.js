import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch'



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
}));

export default function LoginTab() {
    const classes = useStyles();

    function handleSubmit(values, actions) {

        let options = {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
        };
        
        for (let key in values) {
          options.body.append(key, values[key]);
          console.log(values)
        }
        
        fetch('http://localhost:5001/login', options)
            .then(response => console.log(response))
            .catch(error => console.error(error))   
    }
    
   
    return (
        <Paper className={classes.padding}>
            <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Fingerprint />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Password" type="password" fullWidth required />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                            />
                        } label="Remember me" />
                    </Grid>
                    <Grid item>
                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button variant="outlined" color="primary" onClick={handleSubmit()} style={{ textTransform: "none" }}>Login</Button>
                </Grid>
            </div>
        </Paper>
    );
}
