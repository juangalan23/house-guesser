import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

function GreenCheckMark(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar
        src="https://www.fiveclipart.com/wp-content/uploads/2017/03/captivating-green-check-mark-clip-art-green-check-mark-clip-art-green-check-mark-clip-art-green-check-mark-microsoft-clip-art-free-clipart-green-check.png"
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}



export default withStyles(styles)(GreenCheckMark);