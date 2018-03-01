import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import RedXMark from './RedXMark.jsx'

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }


  class IncorrectDialogSlide extends React.Component {
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
      this.setState({ open: false },() =>{
        this.props.resetAnswer();
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
                <RedXMark />
              {" Incorrect!"}
            </DialogTitle>

          </Dialog>
        </div>
      );
    }
  }
  
  export default IncorrectDialogSlide;
  