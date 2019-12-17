import React, {useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import * as IoTService from '../../../service/IoTService'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: '#fff'
    }
}));


export default function Wearable() {
    const classes = useStyles();
    const {t, i18n} = useTranslation();
    const [heartRate, setHeartRate] = useState();
    const [mindActivity, setMindActivity] = useState();
    const [sugar, setSugar] = useState();
    const [diastolicPressure, setDiastolicPressure] = useState();
    const [systolicPressure, setSystolicPressure] = useState();
    const [temperature, setTemperature] = useState();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {t("Send health data")}
                </Typography>
                <form className={classes.form} onSubmit={(event) => {
                    event.preventDefault();
                    IoTService.setUserHealth(localStorage.getItem("userId"), {
                        heartRate: heartRate,
                        mindActivityLevel: mindActivity,
                        sugarLevel: sugar,
                        diastolicPressure: diastolicPressure,
                        systolicPressure: systolicPressure,
                        temperature: temperature
                    }).then(res => {
                        alert(t("Success"))
                    }).catch(error => {
                        alert(t(`Error occurred: ${error}`))
                    })
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                type={"number"}
                                variant="outlined"
                                fullWidth
                                required
                                id="heartRate"
                                label={t("Heart rate")}
                                name="heartRate"
                                autoComplete="heartRate"
                                onChange={(event) => setHeartRate(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type={"number"}
                                variant="outlined"
                                fullWidth
                                required
                                inputProps={{ min: "1", max: "10", step: "1" }}
                                id="mindActivity"
                                label={t("Mind activity")}
                                name="mindActivity"
                                autoComplete="mindActivity"
                                onChange={(event) => setMindActivity(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type={"number"}
                                step={0.1}
                                variant="outlined"
                                fullWidth
                                required
                                inputProps={{ step: "0.1" }}
                                id="sugar"
                                label={t("Sugar")}
                                name="sugar"
                                autoComplete="sugar"
                                onChange={(event) => setSugar(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type={"number"}
                                variant="outlined"
                                fullWidth
                                required
                                id="diastolicPressure"
                                label={t("Diastolic Pressure")}
                                name="diastolicPressure"
                                autoComplete="diastolicPressure"
                                onChange={(event) => setDiastolicPressure(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type={"number"}
                                variant="outlined"
                                fullWidth
                                required
                                id="systolicPressure"
                                label={t("Systolic Pressure")}
                                name="systolicPressure"
                                autoComplete="systolicPressure"
                                onChange={(event) => setSystolicPressure(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type={"number"}
                                variant="outlined"
                                fullWidth
                                required
                                inputProps={{ step: "0.1" }}
                                id="temperature"
                                label={t("Temperature")}
                                name="temperature"
                                autoComplete="temperature"
                                onChange={(event) => setTemperature(event.target.value)}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {t("Send")}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}