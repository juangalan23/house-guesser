import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import GreenCheckMark from './GreenCheckMark.jsx'

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }


  class CorrectDialogSlide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        };
        // this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }
  
    componentDidMount() {
      this.setState({ open: true });
    }
  
    handleClose () {
      this.setState({ open: false }, () => {
        this.props.resetAnswer();
        this.props.getNewHouse();
        this.props.resetHint();
      });
    };
  
    render() {
      return (
        <div>
          <Dialog
            open={this.state.open}
            transition={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
                <GreenCheckMark />
              {" Correct!"}
            </DialogTitle>

          </Dialog>
        </div>
      );
    }
  }
  
  export default CorrectDialogSlide;
  