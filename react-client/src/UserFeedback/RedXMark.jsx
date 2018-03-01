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

function RedXMark(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/1024px-Red_X.svg.png"
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}



export default withStyles(styles)(RedXMark);