
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import blue from 'material-ui/colors/blue';
import App from './Index.jsx';


const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: blue,
  },
  status: {
    danger: 'orange',
  },
});

function Root() {
    return (
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    );
}


ReactDOM.render(<Root />, document.getElementById('app'));