import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class HintsButton extends React.Component {
    constructor (props ) {
        super(props);
        this.state = {

        }
    }
render() {
    return (
        <div>
    
            <Button variant="raised" color="primary" onClick={this.props.handleHint} >
                Need a hint? (0/3)
            </Button>



        </div>
    );
    }
}



export default withStyles(styles)(HintsButton);