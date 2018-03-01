import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
    //   width: '60%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    button: {
        margin: theme.spacing.unit,
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
                            <TableCell> <Button >{this.props.choices[0]} </Button>  </TableCell>
                            <TableCell> <Button >{this.props.choices[1]} </Button> </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell> <Button >{this.props.choices[2]} </Button> </TableCell>
                            <TableCell> <Button >{this.props.choices[3]} </Button> </TableCell>
                        </TableRow>

                    </TableBody>

                </Table>

            </div>
        )
    }
}



export default withStyles(styles)(OptionsTable);