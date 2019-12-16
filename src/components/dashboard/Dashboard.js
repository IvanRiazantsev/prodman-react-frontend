import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {mainListItems, secondaryListItems} from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import {Modal} from 'react-bootstrap'
import {Button} from '@material-ui/core'
import * as UserService from '../../service/UserService'
import {withRouter} from 'react-router-dom'
import {Redirect, Route} from 'react-router-dom'
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import WorkIcon from "@material-ui/icons/Work";
import MainDashboard from "./MainDashboard";
import HealthDashboard from "./HealthDashboard";
import ProductivityDashboard from "./ProductivityDashboard";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit">
                Ivan Ryazantsev
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
        color: '#fff'
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        color: "#fff"
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
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

function ProfileModal(props) {
    let username = localStorage.getItem("username");
    let firstName = localStorage.getItem("firstName");
    let middleName = localStorage.getItem("middleName");
    let lastName = localStorage.getItem("lastName");
    let age = localStorage.getItem("age");
    if (username === "null") {
        username = ''
    }
    if (firstName === "null") {
        firstName = ''
    }
    if (middleName === 'null') {
        middleName = ''
    }
    if (lastName === "null") {
        lastName = ''
    }
    if (age === "null") {
        age = ''
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h6><b>Username:</b> {username}</h6>
                    <h6><b>First Name:</b> {firstName}</h6>
                    {/*<h6><b>Middle Name:</b> {middleName}</h6>*/}
                    <h6><b>Last Name:</b> {lastName}</h6>
                    {/*<h6><b>Age:</b> {age}</h6>*/}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}



function Dashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className={classes.root}>
            {localStorage.getItem("jwtToken") !== null ? '' : <Redirect to="/login"/>}
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => setModalShow(true)}
                        className={clsx(classes.menuButton)}>
                        <PersonIcon/>
                    </IconButton>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => {
                            localStorage.removeItem('jwtToken');
                            localStorage.removeItem('userId');
                            localStorage.removeItem('username');
                            localStorage.removeItem('firstName');
                            localStorage.removeItem('middleName');
                            localStorage.removeItem('lastName');
                            localStorage.removeItem('age');
                            props.history.push("/login")
                        }
                        }
                        className={clsx(classes.menuButton)}>
                        <LogoutIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <div>
                        <ListItem button selected={selectedIndex === 0} onClick={() => {
                            props.history.push("/");
                            setSelectedIndex(0);
                        }}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItem>
                        <ListItem button selected={selectedIndex === 1} onClick={() => {
                            props.history.push("/health");
                            setSelectedIndex(1);
                        }}>
                            <ListItemIcon>
                                <FavoriteIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Health"/>
                        </ListItem>
                        <ListItem button selected={selectedIndex === 2} onClick={() => {
                            props.history.push("/productivity");
                            setSelectedIndex(2);
                        }}>
                            <ListItemIcon>
                                <WorkIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Productivity"/>
                        </ListItem>
                    </div>
                </List>

            </Drawer>
            <ProfileModal show={modalShow} onHide={() => setModalShow(false)}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Route path={"/"} exact component={MainDashboard}/>
                    <Route path={"/health"} exact component={HealthDashboard}/>
                    <Route path={"/productivity"} exact component={ProductivityDashboard}/>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}

export default withRouter(Dashboard);