import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import CorrectDialogSlide from './UserFeedback/CorrectFeedback.jsx';
import IncorrectDialogSlide from './UserFeedback/IncorrectFeedback.jsx';
var formatUSD = require('format-usd');

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
            answer: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.resetAnswer = this.resetAnswer.bind(this);
    }

    handleClick(e) {
            e.preventDefault();
            if( e.currentTarget.getAttribute('data-option') ===  this.props.houseData.housevalue) {
                this.setState({
                    answer: true
                }, ()=> {
                    // this.props.getNewHouse();
                })
            } else {
                this.setState({
                    answer: false
                })
            }
    } 

    resetAnswer() {
        this.setState({
            answer: null
        })
    }
    render() {
        if(this.props.houseData.bedrooms >1 ) {
            var bedrooms = "bedrooms"
        } else {
            var bedrooms = "bedroom"
        }

        if(this.props.houseData.bathrooms >1 ) {
            var bathrooms = "bathrooms"
        } else {
            var bathrooms = "bathroom"
        }

        if(this.state.answer === null) {
            var answerFeedback = <div> </div>
        }
        if (this.state.answer === true) {
            var answerFeedback = < CorrectDialogSlide 
                                    resetAnswer={this.resetAnswer} 
                                    getNewHouse={this.props.getNewHouse}
                                    resetHint={this.props.resetHint}
                                    />
        }
        if (this.state.answer === false) {
            var answerFeedback = < IncorrectDialogSlide resetAnswer={this.resetAnswer} />
        }

        return(
            
            <div>
                {answerFeedback}
                <Table>


                    <TableBody>

                        <TableRow>
                            <TableCell> 
                                <Button color="secondary" 
                                    data-option={this.props.choices[0]}
                                    onClick={this.handleClick}
                                > 
                                    {formatUSD({amount: this.props.choices[0], decimalPlaces: 0})}
 
                                </Button>  
                            </TableCell>
                            <TableCell> 
                                <Button color="secondary" 
                                    data-option={this.props.choices[1]}
                                    onClick={this.handleClick}
                                >   
                                    {formatUSD({amount: this.props.choices[1], decimalPlaces: 0})}

                                </Button> 
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell> 
                                <Button color="secondary" 
                                    data-option={this.props.choices[2]}
                                    onClick={this.handleClick}
                                >   
                                    {formatUSD({amount: this.props.choices[2], decimalPlaces: 0})} 
                                </Button> 
                            </TableCell>
                            <TableCell> 
                                <Button color="secondary" 
                                    data-option={this.props.choices[3]}
                                    onClick={this.handleClick}
                                >   
                                    {formatUSD({amount: this.props.choices[3], decimalPlaces: 0})}
                                </Button> 
                            </TableCell>
                        </TableRow>

                    </TableBody>

                </Table>

            </div>
        )
    }
}



export default withStyles(styles)(OptionsTable);