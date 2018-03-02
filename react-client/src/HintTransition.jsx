import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import { withStyles } from 'material-ui/styles';
var formatUSD = require('format-usd');



function TransitionDown(props) {
  return <Slide direction="down" {...props} />;
}

class HintTransition extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                open: false,
                transition: null,
            };
            this.handleClick = this.handleClick.bind(this);
            this.handleClose = this.handleClose.bind(this)
}

  handleClick  (transition) {
      this.props.changeHint()
    this.setState({ open: true, transition });
  };

  handleClose ()  {
    this.setState({ open: false });
  };

  render() {
    if(this.props.onHint <= 2 ) {
        var hintCount = this.props.onHint
    } else {
        var hintCount=2;
    }

    if ( this.props.onHint > 2) {
        var buttonMessage = 'Out of hints!';
        var hintMessage = "No hints left!"
    }
    if(this.props.onHint ===0) {
        var buttonMessage = 'Need a hint? (0/2)';
    }
    if (this.props.onHint ===1 ) {
        var buttonMessage = '1 left! (1/2) ';
        var hintMessage = 'The average house in the area is worth ' 
        + formatUSD({amount: this.props.houseData.areavalue, decimalPlaces: 0});
    } 
    if (this.props.onHint === 2 ) {
        var buttonMessage = 'Out of hints!';
        var hintMessage = 'This house was built in ' + this.props.houseData.year;
    }
    
    return (
        
      <div>

        <Button variant="raised" color="primary" onClick={ () => this.handleClick(TransitionDown)} >
               {buttonMessage}
        </Button>
        
        <Snackbar
          open={this.state.open}
          onClose={ () => this.handleClose()}
          transition={this.state.transition}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id"> {hintMessage}</span>}
        />
      </div>
    );
  }
}

export default HintTransition;