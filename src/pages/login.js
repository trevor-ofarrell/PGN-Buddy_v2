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

export default function LoginTab() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        console.log(password);
    };

    async function Login() {

        var data = new URLSearchParams();
        data.append('email', email);
        data.append('password', password);
        data.append('grant_type', 'password');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;' },
            body: data
        };

        const res = await fetch("http://127.0.0.1:5001/login", requestOptions);
        console.log((email))
        console.log(res)
    }
  
    useEffect(() => {
      Login();
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
                                    label="email"
                                    type="email"
                                    autoComplete="email"
                                    variant="filled"
                                    className={classes.textfield}
                                    onChange={(event) => {setEmail(event.target.value)}}
                                    value={email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="filled-password-input2"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled"
                                    className={classes.textfield}
                                    onChange={(event) => {setPassword(event.target.value)}}
                                    value={password}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Link href='/'>
                                <div>
                                    <Button
                                        className={classes.button}
                                        onClick={Login}
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