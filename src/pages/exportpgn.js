import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Card } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: 'url("/checkmate.jpeg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: '100vh',
    },
    mask: {
        background: 'linear-gradient(180deg, rgba(156, 146, 156, 0.462) 20%, rgba(53, 53, 53, 0.414) 62%, rgba(0, 0, 0, 0.758) 90%)',
        width: '100vw',
        height: '100vh',
    },
    card: {
        marginTop: '40vh',
        background: 'linear-gradient(180deg, rgba(156, 146, 156, 0.462) 20%, rgba(53, 53, 53, 0.414) 62%, rgba(0, 0, 0, 0.758) 90%)',

    },
    textfield: {
        width: '100%'
    },
    button: {
        width: '100%',
        color: 'white'
    }

}));

export default function ExportPGN() {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [gameString, setGameString] = useState("");
    const [folder, setFolder] = useState("");

    async function Export() {

        var data = new URLSearchParams();
        data.append('name', name);
        data.append('gamestring', gameString);
        data.append('folder', folder);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;' },
            body: data
        };

        const res = await fetch("http://127.0.0.1:5001/lichessupload", requestOptions);
        console.log((gameString))
        console.log(res)
    }
  
    useEffect(() => {
      Export();
    }, []);
       
    return (
        <div className={classes.root}>
            <Grid container className={classes.mask}>
                <Grid item xs={1} sm={1} md={3} lg={4}/>
                <Grid item xs={10} sm={10} md={6} lg={4}>
                    <Card className={classes.card}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="filled-password-input"
                                    label="name"
                                    type="name"
                                    autoComplete="name"
                                    variant="filled"
                                    className={classes.textfield}
                                    onChange={(event) => {setName(event.target.value)}}
                                    value={name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="filled-password-input"
                                    label="folder"
                                    type="folder"
                                    autoComplete="folder"
                                    variant="filled"
                                    className={classes.textfield}
                                    onChange={(event) => {setFolder(event.target.value)}}
                                    value={folder}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="filled-password-input2"
                                    label="gamestring"
                                    type="gamestring"
                                    autoComplete="gamestring"
                                    variant="filled"
                                    className={classes.textfield}
                                    onChange={(event) => {setGameString(event.target.value)}}
                                    value={gameString}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Link href='/'>
                                <div>
                                    <Button
                                        className={classes.button}
                                        onClick={Export}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </Link>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={1} sm={1} md={3} lg={4}/>
               
            </Grid>
        </div>
    );
}