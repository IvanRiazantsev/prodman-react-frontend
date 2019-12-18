import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from "recharts";
import * as PresenceService from '../../service/PresenceService'
import Title from "./Title";
import * as OfficeService from "../../service/OfficeService";
import * as UserService from "../../service/UserService";
import MaterialTable from "material-table";
import Chart from "./Chart";

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function createData(time, amount) {
    return {time, amount};
}

export default function ProductivityDashboard() {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [overallPresence, setOverallPresence] = React.useState([]);
    const [recommendations, setRecommendations] = React.useState([]);

    React.useEffect(effect => {
        // PresenceService.getPresenceForWeek(parseInt(localStorage.getItem("userId"))).then(res => {
        //     console.log(res)
        // });
        // UserService.getUserProductivity(parseInt(localStorage.getItem("userId"))).then(res => {
        //     console.log(res)
        // })
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
                <Paper>
                    {/*<Title>{t("Overall daytime")}</Title>*/}
                    {/*<ResponsiveContainer>*/}
                    {/*    <BarChart layout={"vertical"} width={730} height={250} data={overallPresence}>*/}
                    {/*        <XAxis dataKey="time"/>*/}
                    {/*        <YAxis dataKey="office"/>*/}
                    {/*        <Bar dataKey="time" fill="#FF6D00"/>*/}
                    {/*    </BarChart>*/}
                    {/*</ResponsiveContainer>*/}
                    <MaterialTable
                        options={{
                            search: false,
                            filtering: false,
                            sorting: false,
                            draggable: false,
                            actionsColumnIndex: 1
                        }}
                        title={<Title>{t('Recommendations')}</Title>}
                        columns={[{
                            title: t("Recommendation"), field: "recommendation"
                        }]}
                        data={[
                            {recommendation: t("Drink coffee")},
                            {recommendation: t("Go home")},
                            {recommendation: t("Low Sugar")}
                        ]}
                        localization={{
                            header: {
                                actions: t('Actions')
                            },
                            body: {
                                deleteTooltip: t('Delete'),
                                addTooltip: t('Add'),
                                editRow: {
                                    deleteText: t('Delete Row?'),
                                    cancelTooltip: t('Cancel'),
                                    saveTooltip: t('Save')
                                },
                                emptyDataSourceMessage: t('emptyDataSourceMessage')
                            },
                            pagination: {
                                labelRowsSelect: t('Rows'),
                                labelRowsPerPage: t('Rows per page'),
                                firstTooltip: t('First Page'),
                                previousTooltip: t('Previous Page'),
                                nextTooltip: t('Next Page'),
                                lastTooltip: t('Last Page'),
                                labelDisplayedRows: t('Displayed Rows')
                            }
                        }}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={7}>
                <Paper className={fixedHeightPaper}>
                    <Chart data={[
                        createData('09:00', 6),
                        createData('12:00', 3),
                        createData('15:00', 9),
                        createData('18:00', 5)
                    ]} title={t("Today's productivity rate")} axisY={t("index")}/>
                </Paper>
            </Grid>
        </Grid>
    )
}