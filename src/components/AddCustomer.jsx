import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = { firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '',};
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
        this.refs.simpleDialog.hide();
    }

    render() {
      // Add customer page doesn't fit to default size modal
      const addCustomerDialog = {
        position: 'absolute',
        width: '70%',
        marginTop: '450px',
        marginLeft: '-35%',
      };

      return (
        <div>
          <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={() => this.refs.simpleDialog.show()}><AddIcon /> New Customer </Button>
          <SkyLight hideOnOverlayClicked dialogStyles={addCustomerDialog} ref="simpleDialog" title="Add a customer">
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
            <Button style={{ margin: 10 }} variant="contained" color="secondary" onClick={this.handleSubmit}><SaveIcon /> Save Customer </Button>
          </SkyLight>
        </div>
      );
    }
}

export default AddCustomer;
