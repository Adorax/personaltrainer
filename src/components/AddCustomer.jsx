import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = { firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '', open: false};
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    // Save customer and load customers and finally close modal
    handleSubmit = (event) => {
        event.preventDefault();
        let newCustomer = {firstname: this.state.firstname, lastname: this.state.lastname, streetaddress: this.state.streetaddress, postcode: this.state.postcode, city: this.state.city, email: this.state.email, phone: this.state.phone,};
        this.props.addCustomer(newCustomer);
        this.props.loadCustomers();
        this.handleClose();
    }

    handleClose = (event) => {
      this.setState({ open: false });
      //this.refs.simpleDialog.hide();
    }

    render() {
      const { fullScreen } = this.props;
      // Add customer page doesn't fit to default size modal
      const addCustomerDialog = {
        position: 'absolute',
        width: '70%',
        marginTop: '450px',
        marginLeft: '-35%',
      };

      return (
        <div>
          <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={() => this.setState({ open: true })}><AddIcon /> New Customer </Button>
          <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              scroll="body"
              fullScreen={fullScreen}
          >
            <DialogTitle id="form-dialog-title">{"Add a custome"}r</DialogTitle>
            <DialogContent >
              <TextField id="firstname" label="Firstname" placeholder="Firstname" margin="normal" name="firstname"
                onChange={this.handleChange} value={this.state.firstname} /><br></br>
              <TextField id="lastname" label="Lastname" placeholder="Lastname" margin="normal" name="lastname"
                  onChange={this.handleChange} value={this.state.lastname} /><br></br>
              <TextField id="streetaddress" label="Street address" placeholder="Street address" margin="normal" name="streetaddress"
                  onChange={this.handleChange} value={this.state.streetaddress} /><br></br>
              <TextField id="postcode" label="Postcode" placeholder="Postcode" margin="normal" name="postcode"
                  onChange={this.handleChange} value={this.state.postcode} /><br></br>
              <TextField id="city" label="City" placeholder="City" margin="normal" name="city"
                  onChange={this.handleChange} value={this.state.city} /><br></br>
              <TextField id="email" label="Email" placeholder="Email" margin="normal" name="email"
                  onChange={this.handleChange} value={this.state.email} /><br></br>
              <TextField id="phone" label="Phone" placeholder="Phone" margin="normal" name="phone"
                  onChange={this.handleChange} value={this.state.phone} /><br></br>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button style={{ margin: 10 }} variant="contained" color="secondary"
                onClick={this.handleSubmit} autoFocus> <SaveIcon /> Save Customer
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}

AddCustomer.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(AddCustomer);
