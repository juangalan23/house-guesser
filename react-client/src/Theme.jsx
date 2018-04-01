
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import lightgreen from 'material-ui/colors/lightgreen';
import blue from 'material-ui/colors/blue';
import App from './Index.jsx';


const theme = createMuiTheme({
    palette: {
      primary: lightgreen,
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
export default Root;


