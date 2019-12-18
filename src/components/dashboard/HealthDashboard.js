import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Orders from "./Orders";
import {Typography, List, ListItem, Button} from "@material-ui/core";
import * as UserService from '../../service/UserService'
import MaterialTable from "material-table";
import Title from './Title';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {Modal} from "react-bootstrap";
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function AddDiseaseModal(props) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const [diseasesAbsent, setDiseasesAbsent] = useState();
    const [diseaseToAdd, setDiseaseToAdd] = useState();
    const handleChange = event => {
        setDiseaseToAdd(event.target.value);
    };
    useEffect(effect => {
        UserService.getUnselectedDiseases(parseInt(localStorage.getItem("userId"))).then(res => {
            setDiseasesAbsent(res.map(disease => {
                let name = disease.toLowerCase();
                name = name[0].toUpperCase() + name.slice(1);
                return {
                    key: disease,
                    name: name
                }
            }))
        })
    },[]);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("Add disease")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="disease-select-label">{t("Diseases")}</InputLabel>
                        <Select
                            labelId="disease-select-label"
                            id="disease-select"
                            value={diseaseToAdd}
                            onChange={handleChange}
                        >
                            {diseasesAbsent ? diseasesAbsent.map((disease, index) => (
                                <MenuItem key={index} value={disease.key}>{disease.name}</MenuItem>
                            )) : ''}
                        </Select>
                    </FormControl>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"contained"} style={{color: 'white'}} color={"primary"} onClick={() => {
                    UserService.addDisease(parseInt(localStorage.getItem("userId")), diseaseToAdd).then(res => {
                        props.onHide();
                        UserService.getUser(parseInt(localStorage.getItem("userId"))).then(res => {
                            props.setDiseases(res.diseases.map(disease => {
                                let name = disease.toLowerCase();
                                name = name[0].toUpperCase() + name.slice(1);
                                return {
                                    disease: name
                                }
                            }))
                        });
                        UserService.getUnselectedDiseases(parseInt(localStorage.getItem("userId"))).then(res => {
                            setDiseasesAbsent(res.map(disease => {
                                let name = disease.toLowerCase();
                                name = name[0].toUpperCase() + name.slice(1);
                                return {
                                    key: disease,
                                    name: name
                                }
                            }))
                        })
                    })
                }}>{t("Add")}</Button>
                <Button color={"secondary"} onClick={props.onHide}>{t("Close")}</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default function HealthDashboard(props) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [diseases, setDiseases] = useState();
    const [modalShow, setModalShow] = React.useState(false);
    const [heartRate, setHeartRate] = useState([]);
    const [diastolicPressure, setDiastolicPressure] = useState([]);
    const [systolicPressure, setSystolicPressure] = useState([]);
    const [sugar, setSugar] = useState([]);
    const [temperature, setTemperature] = useState([]);
    const [mindActivity, setMindActivity] = useState([]);

    useEffect(effect => {
        UserService.getUser(parseInt(localStorage.getItem("userId"))).then(res => {
            setDiseases(res.diseases.map(disease => {
                let name = disease.toLowerCase();
                name = name[0].toUpperCase() + name.slice(1);
                return {
                    disease: name
                }
            }))
        });
        UserService.getUserHealthToday(parseInt(localStorage.getItem("userId"))).then(res => {
            console.log(res);
            const heartRates = [];
            const diastolicPressures = [];
            const systolicPressures = [];
            const sugars = [];
            const temperatures = [];
            const mindActivities = [];
            res.forEach(health => {
                let time = moment(health.date).format('kk:mm');
                if (time === '24:00') {
                    time = '00:00';
                }
                const heartRate = health.heartRate;
                const diastolicPressure = health.diastolicPressure;
                const systolicPressure = health.systolicPressure;
                const sugar = health.sugarLevel;
                const temperature = health.temperature;
                const mindActivity = health.mindActivityLevel;
                heartRates.push({time: time, amount: heartRate});
                diastolicPressures.push({time: time, amount: diastolicPressure});
                systolicPressures.push({time: time, amount: systolicPressure});
                sugars.push({time: time, amount: sugar});
                temperatures.push({time: time, amount: temperature});
                mindActivities.push({time: time, amount: mindActivity});
            });
            setHeartRate(heartRates);
            setDiastolicPressure(diastolicPressures);
            setSystolicPressure(systolicPressures);
            setSugar(sugars);
            setTemperature(temperatures);
            setMindActivity(mindActivities);
        })
    }, []);
    return (
        <Grid container spacing={3}>
            {/* Chart */}
            <AddDiseaseModal setDiseases={setDiseases}
                             show={modalShow}
                             onHide={() => setModalShow(false)}/>
            <Grid item xs={12} sm={6}>
                <Paper>
                    <MaterialTable
                        options={{
                            search: false,
                            filtering: false,
                            sorting: false,
                            draggable: false,
                            actionsColumnIndex: 1
                        }}
                        title={<Title>{t('Diseases')}</Title>}
                        columns={[{
                            title: t("Disease name"), field: "disease"
                        }]}
                        data={diseases}
                        actions={[
                            {
                                icon: 'delete',
                                tooltip: t('Delete'),
                                onClick: (event, rowData) => {
                                    UserService.deleteDisease(parseInt(localStorage.getItem("userId")), rowData.disease.toUpperCase()).then(res => {
                                        UserService.getUser(parseInt(localStorage.getItem("userId"))).then(res => {
                                            setDiseases(res.diseases.map(disease => {
                                                let name = disease.toLowerCase();
                                                name = name[0].toUpperCase() + name.slice(1);
                                                return {
                                                    disease: name
                                                }
                                            }))
                                        });
                                    })
                                }
                            },
                            {
                                icon: 'add',
                                tooltip: t('Add'),
                                isFreeAction: true,
                                onClick: (event, rowData) => {
                                    setModalShow(true)
                                }
                            }
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
            <Grid item xs={12} sm={6}>
                <Paper className={fixedHeightPaper}>
                    <Chart data={heartRate} title={t("Today's pulse rate")} axisY={t("BPM")}/>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper className={fixedHeightPaper}>
                    <Chart data={diastolicPressure} title={t("Today's diastolic pressure")} axisY={t("pressureMMhg")}/>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper className={fixedHeightPaper}>
                    <Chart data={systolicPressure} title={t("Today's systolic pressure")} axisY={t("pressureMMhg")}/>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper className={fixedHeightPaper}>
                    <Chart data={sugar} title={t("Today's sugar level")} axisY={t("sugarMeasurement")}/>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper className={fixedHeightPaper}>
                    <Chart data={temperature} title={t("Today's temperature")} axisY={"℃"}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                    <Chart data={mindActivity} title={t("Today's mind activity")} axisY={t("index")}/>
                </Paper>
            </Grid>
        </Grid>
    )
}
