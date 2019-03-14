import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
 
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton'; 

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '100px'

  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});
 
class OutlinedTextFields extends React.Component {
  state = { 
    openSnackBar: false,
    snackBarMessage: '',
  };

  handleChange =  event => {
    const { target: { name, value } } = event; 
    this.setState({
      [name]: event.target.value,
    });
  };
  loginFunction = (event) =>  { 
    // this.setState({ openSnackBar: false })
    axios.post('api/login', this.state)
      .then((response) => {
        console.log(response);
        if(response.data.success) {

            this.setState({
                openSnackBar: true,
                snackBarMessage: 'You are logged in'
            })
        } else {
                    
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'User does not exists'
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleClose= (e) => {
    this.setState({
        openSnackBar: false
    })
  }
  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          value={this.state.value} onChange={this.handleChange}
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          name="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          value={this.state.value} onChange={this.handleChange}
        />
        <Button variant="contained" color="primary" className={classes.button} onClick={this.loginFunction}>
          Login
        </Button>
  
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnackBar}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackBarMessage}</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              CLOSE
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            > 
            </IconButton>,
          ]}
        /> 
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
