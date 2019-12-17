import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainPage from './components/MainPage'
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from '@material-ui/styles';

class ProdmanApp extends React.Component {

    myTheme = createMuiTheme({
        palette: {
            primary: {main: '#FF6D00'}
        },
    });

    render() {
        return (
            <div>
                <ThemeProvider theme={this.myTheme}>
                    <BrowserRouter>
                        <Route path={["/", "/health", "/productivity", "/iot/wearable", "/iot/service"]} exact component={MainPage}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/signup" exact component={SignUp}/>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        )
    }
}

export default ProdmanApp;
