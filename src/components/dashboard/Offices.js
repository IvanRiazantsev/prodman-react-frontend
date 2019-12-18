import React, {useEffect, useState} from "react";
import {Redirect, withRouter} from 'react-router-dom'
import * as OfficeService from '../../service/OfficeService'
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import * as UserService from "../../service/UserService";
import {Modal} from "react-bootstrap";
import {Button} from "@material-ui/core";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import Title from "./Title";
import TextField from "@material-ui/core/TextField";

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

function AddOfficeModal(props) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const [address, setAddress] = useState();
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("Add office")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label={t('Address')}
                        name="address"
                        autoComplete="address"
                        autoFocus
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"contained"} style={{color: 'white'}} color={"primary"} onClick={() => {
                    OfficeService.addOffice({address: address}).then(res => {
                        OfficeService.getOffices().then(res => {
                            props.setOffices(res)
                        });
                        props.onHide()
                    })
                }}>{t("Add")}</Button>
                <Button color={"secondary"} onClick={props.onHide}>{t("Close")}</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Offices() {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [offices, setOffices] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(effect => {
        OfficeService.getOffices().then(res => {
            setOffices(res);
        })
    }, []);

    return (
        <Grid container spacing={2}>
            {localStorage.getItem("isAdmin") === 'true' ? '' : <Redirect to={"/"}/>}
            <AddOfficeModal setOffices={setOffices}
                             show={modalShow}
                             onHide={() => setModalShow(false)}/>
            <Grid item xs={12}>
                <Paper>
                    <MaterialTable
                        options={{
                            search: false,
                            filtering: false,
                            sorting: false,
                            draggable: false,
                            actionsColumnIndex: 1
                        }}
                        title={<Title>{t('Offices')}</Title>}
                        columns={[{
                            title: t("Address"), field: "address"
                        }]}
                        data={offices}
                        actions={[
                            {
                                icon: 'delete',
                                tooltip: t('Delete'),
                                onClick: (event, rowData) => {
                                    OfficeService.deleteOffice(rowData.id).then(res => {
                                        OfficeService.getOffices().then(res1 => {
                                            setOffices(res1)
                                        })
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
        </Grid>
    )
}

export default withRouter(Offices)