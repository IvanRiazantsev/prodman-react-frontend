import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Orders from "./Orders";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {useTranslation} from "react-i18next";
import * as UserService from "../../service/UserService";
import moment from "moment";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function createData(time, amount) {
    return {time, amount};
}

export default function MainDashboard() {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [heartRate, setHeartRate] = useState([]);
    useEffect(effect => {
        UserService.getUserHealthToday(parseInt(localStorage.getItem("userId"))).then(res => {
            const heartRates = [];
            res.forEach(health => {
                let time = moment(health.date).format('kk:mm');
                if (time === '24:00') {
                    time = '00:00';
                }
                const heartRate = health.heartRate;
                heartRates.push({time: time, amount: heartRate});
            });
            setHeartRate(heartRates);
        })
    }, []);
    return (
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                    <Chart data={heartRate} title={t("Today's pulse rate")} axisY={t('BPM')}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                    <Chart data={[
                        createData('09:00', 6),
                        createData('12:00', 3),
                        createData('15:00', 9),
                        createData('18:00', 5)
                    ]} title={t("Today's productivity rate")} axisY={t("index")}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Orders/>
                </Paper>
            </Grid>
        </Grid>
    )
}
