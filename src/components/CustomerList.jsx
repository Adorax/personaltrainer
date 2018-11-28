import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {CSVLink, CSVDownload} from 'react-csv';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

class Customerlist extends Component {

  constructor(props) {
    super(props);
    this.state = { customers: [], snackbar: {message: '', open: false } };
  }

  componentDidMount() {
    this.loadCustomers();
  }

  // Load customers from REST API
  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers/')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        customers: responseData.content,
      });
    })
  }

  // Create new customer
  addCustomer(customer) {
    fetch('https://customerrest.herokuapp.com/api/customers/',
    {   method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(customer)
    })
    .then(res => this.loadCustomers())
    .catch(err => console.error(err))
  }

  // Delete customer
  onDelClick = (idLink) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            fetch(idLink, {method: 'DELETE'})
            .then(res => {this.setState({ snackbar: {message: 'Customer deleted', open: true} }); this.loadCustomers() ;})
            .catch(err => console.error(err))
          }
        },
        {
          label: 'Cancel',
        }
      ]
    })
  }

  // Update customer
  updateCustomer(customer, link) {
    fetch(link,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(customer)
    })
    .then(
      this.setState({ snackbar: {message: 'Customer updated', open: true,}})
    )
    .catch( err => console.error(err))
  }

  handleClose = (event, reason) => {
      this.setState({ snackbar: {message: '', open: false,}});
  };

  addTraining(training) {
    console.log(training);
    fetch('https://customerrest.herokuapp.com/api/trainings/',
    {   method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(training)
    })
    .then(res => this.loadTrainings())
    .catch(err => console.error(err))
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings/')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        trainings: responseData.content,
      });
    })
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {

      const columns =[
        {
          accessor: "links.0.href",
          show: false //??
        },
        {
          Header: "Firstname",
          accessor: "firstname",
          Cell: this.renderEditable
        },
        {
          Header: "Lastname",
          accessor: "lastname",
          Cell: this.renderEditable
        },
        {
          Header: "Street address",
          accessor: "streetaddress",
          Cell: this.renderEditable
        },
        {
          Header: "Postcode",
          accessor: "postcode",
          Cell: this.renderEditable
        },
        {
          Header: "City",
          accessor: "city",
          Cell: this.renderEditable
        },
        {
          Header: "Email",
          accessor: "email",
          Cell: this.renderEditable
        },
        {
          Header: "Phone",
          accessor: "phone",
          Cell: this.renderEditable
        },
        {
          id: 'button',
          sortable: false,
          filterable: false,
          width: 60,
          accessor: 'links.0.href',
          Cell: ({value, row}) => (
                <Tooltip title='Update' placement='right'>
                    <IconButton onClick={() => this.updateCustomer(row,value)} aria-label='update'>
                        <SaveIcon />
                    </IconButton>
                </Tooltip>
            )
        },
        {
          id: 'button',
          sortable: false,
          filterable: false,
          width: 60,
          accessor: 'links.0.href',
          Cell: ({value}) => (
              <Tooltip title='Delete' placement='right'>
                  <IconButton onClick={() => this.onDelClick(value)} aria-label='delete'>
                      <DeleteIcon />
                  </IconButton>
              </Tooltip>
          )
        },
        {
          id: 'button',
          sortable: false,
          filterable: false,
          width: 150,
          accessor: 'links.0.href',
          Cell: ({value}) => (
              <Tooltip title='Add training' placement='top'>
                <AddTraining customer={value} addTraining={this.addTraining} loadTrainings={this.loadTrainings}/>
              </Tooltip>
          )
        }
      ]

      return (
          <div className="App-body">
            <div className="row">
              <AddCustomer addCustomer={this.addCustomer} loadCustomers={this.loadCustomers} />
              <CSVLink style={{padding: 20}} data={this.state.customers}>Download CSV</CSVLink>
            </div>
            <ReactTable data={this.state.customers} columns={columns} filterable className="-highlight" defaultPageSize={10} />
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
              open={this.state.snackbar.open}
              autoHideDuration={2000}
              onClose={this.handleClose}
              ContentProps={{ 'aria-describedby': 'message-id', }}
              message={<span id="message-id">{this.state.snackbar.message}</span>}
              action={[
                <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                  UNDO
                </Button>,
                <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose} >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </div>
      );
  }
}

export default Customerlist;
