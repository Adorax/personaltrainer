import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import {CSVLink, CSVDownload} from 'react-csv';
import AddCar from './AddCar';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

class Carlist extends Component {

  constructor(props) {
    super(props);
    this.state = { cars: [], snackbar: {message: '', open: ''} };
  }

  componentDidMount() {
    this.loadCars();
  }

  // Load cars from REST API
  loadCars = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        cars: responseData._embedded.cars,
      });
    })
  }

  // Create new car
  addCar(car) {
    fetch('https://carstockrest.herokuapp.com/cars',
    {   method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(car)
    })
    .then(res => this.loadCars())
    .catch(err => console.error(err))
  }

  // Delete car
  onDelClick = (idLink) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            fetch(idLink, {method: 'DELETE'})
            .then(res => {this.setState({ snackbar: {message: 'Car deleted', open: true} }); this.loadCars() ;})
            .catch(err => console.error(err))
            //toast.success("Delete succeed", {position: toast.POSITION.BOTTOM_LEFT});
          }
        },
        {
          label: 'Cancel',
        }
      ]
    })
  }

  // Update car
  updateCar(car, link) {
    fetch(link,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(car)
    })
    .then(
      this.setState({ snackbar: {message: 'Car updated', open: true,}})
    //toast.success("Changes saved", {position: toast.POSITION.BOTTOM_LEFT})
    )
    .catch( err => console.error(err))
  }

  handleClose = (event, reason) => {
      this.setState({ snackbar: {message: '', open: false,}});
  };

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.cars];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ cars: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.cars[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {

      const columns =[
        {
          accessor: "_links.self.href",
          show: false
        },
        {
          Header: "Brand",
          accessor: "brand",
          Cell: this.renderEditable
        },
        {
          Header: "Model",
          accessor: "model",
          Cell: this.renderEditable
        },
        {
          Header: "Year",
          accessor: "year",
          Cell: this.renderEditable
        },
        {
          Header: "Color",
          accessor: "color",
          Cell: this.renderEditable
        },
        {
          Header: "Fuel",
          accessor: "fuel",
          Cell: this.renderEditable
        },
        {
          Header: "Price €",
          accessor: "price",
          Cell: this.renderEditable
        },
        {
          id: 'button',
          sortable: false,
          filterable: false,
          width: 100,
          accessor: '_links.self.href',
          Cell: ({value, row}) => (
                <Tooltip title='Update' placement='right'>
                    <IconButton onClick={() => this.updateCar(row,value)} aria-label='update'>
                        <SaveIcon />
                    </IconButton>
                </Tooltip>
            )
        },
        {
          id: 'button',
          sortable: false,
          filterable: false,
          width: 100,
          accessor: '_links.self.href',
          Cell: ({value}) => (
              <Tooltip title='Delete' placement='right'>
                  <IconButton onClick={() => this.onDelClick(value)} aria-label='delete'>
                      <DeleteIcon />
                  </IconButton>
              </Tooltip>
          )
        }
      ]

      return (
          <div className="App-body">
            <div className="row">
              <AddCar addCar={this.addCar} loadCars={this.loadCars} />
              <CSVLink style={{padding: 20}} data={this.state.cars}>Download CSV</CSVLink>
            </div>
            <ReactTable data={this.state.cars} columns={columns} filterable className="-highlight" defaultPageSize={10} />
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


export default Carlist;

//<ToastContainer autoClose={2000}/>
//Snackbar give an error depreciate
//Toast is react basic notif, Snackbar is material-ui
