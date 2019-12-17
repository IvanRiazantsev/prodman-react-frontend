import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Orders from "./Orders";
import {Typography, List, ListItem} from "@material-ui/core";
import * as UserService from '../../service/UserService'

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

export default function HealthDashboard() {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [diseases, setDiseases] = useState();
    useEffect(effect => {
        UserService.getUserHealth(parseInt(localStorage.getItem("userId"))).then(res => {
            console.log(res)
        })
    })
    return(
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} sm={4}>
                <Paper className={fixedHeightPaper}>
                    <Typography variant="h6" className={classes.title}>
                        {t('Diseases')}
                    </Typography>
                    <List>

                    </List>
                    {/*<Chart data={[*/}
                    {/*    createData('00:00', 55),*/}
                    {/*    createData('03:00', 58),*/}
                    {/*    createData('06:00', 80),*/}
                    {/*    createData('09:00', 65),*/}
                    {/*    createData('12:00', 60),*/}
                    {/*    createData('15:00', 90),*/}
                    {/*    createData('18:00', 70),*/}
                    {/*    createData('21:00', 60),*/}
                    {/*    createData('24:00', undefined)*/}
                    {/*]} title={t("Diseases")} axisY={t('BPM')}/>*/}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                    <Chart data={[
                        createData('09:00', 6),
                        createData('12:00', 8),
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