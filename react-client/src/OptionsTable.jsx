import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const styles = theme => ({
    root: {
    //   width: '60%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    }
    // ,
    // table: {
    //   minWidth: 700,
    // },
  });


class OptionsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Guess the house value!  </TableCell>
                            <TableCell>   </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        <TableRow>
                            <TableCell> {this.props.choices[0]}  </TableCell>
                            <TableCell> {this.props.choices[1]} </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell> {this.props.choices[2]}  </TableCell>
                            <TableCell> {this.props.choices[3]} </TableCell>
                        </TableRow>

                    </TableBody>

                </Table>

            </div>
        )
    }
}



export default withStyles(styles)(OptionsTable);