import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch'

import {
    ResponsiveAppBar,
} from "../components/ResponsiveAppBar"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        backgroundImage: 'url("/checkmate.jpeg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
}));

export default function DashBoard() {
    const classes = useStyles();
    return(
        <Box className={classes.root}>
            <ResponsiveAppBar />
            <Box>
                s
            </Box>
        </Box>
    )
}
