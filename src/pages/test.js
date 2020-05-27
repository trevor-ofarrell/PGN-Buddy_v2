import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch'


export default function test() {

    const status = useEffect(() => {
        fetch('http://localhost:5001/test')
            .then(response => response.json().then(data => {console.log(data)}))
            .catch(error => console.error(error))
    }, [])


    return(
        <div>
            {status}
        </div>
    )
} 