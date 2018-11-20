import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {CSVLink, CSVDownload} from 'react-csv';
import AddTraining from './AddTraining';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

class TrainingList extends Component {

  constructor(props) {
    super(props);
    this.state = { trainings: [], snackbar: {message: '', open: false } };
  }

  componentDidMount() {
    this.loadTrainings();
  }

  // Load trainings from REST API
  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings/')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        trainings: responseData.content,
      });
    })
  }

  // Create new training
  addTraining(training) {
    fetch('https://customerrest.herokuapp.com/api/customers/',
    {   method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(training)
    })
    .then(res => this.loadTrainings())
    .catch(err => console.error(err))
  }

  // Delete training
  onDelClick = (idLink) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            fetch(idLink, {method: 'DELETE'})
            .then(res => {this.setState({ snackbar: {message: 'Training deleted', open: true} }); this.loadTrainings() ;})
            .catch(err => console.error(err))
          }
        },
        {
          label: 'Cancel',
        }
      ]
    })
  }

  // Update training
  updateTraining(training, link) {
    fetch(link,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(training)
    })
    .then(
      this.setState({ snackbar: {message: 'Training updated', open: true,}})
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
          const data = [...this.state.trainings];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ trainings: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.trainings[cellInfo.index][cellInfo.column.id]
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
          Header: "Date",
          accessor: "date",
          Cell: this.renderEditable
        },
        {
          Header: "Duration",
          accessor: "duration",
          Cell: this.renderEditable
        },
        {
          Header: "Activity",
          accessor: "activity",
          Cell: this.renderEditable
        },
        {
          id: 'button',
          sortable: false,
          filterable: false,
          width: 100,
          accessor: 'links.0.href',
          Cell: ({value, row}) => (
                <Tooltip title='Update' placement='top'>
                    <IconButton onClick={() => this.updateTraining(row,value)} aria-label='update'>
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
          accessor: 'links.0.href',
          Cell: ({value}) => (
              <Tooltip title='Delete' placement='right'>
                  <IconButton onClick={() => this.onDelClick(value)} aria-label='delete'>
                      <DeleteIcon />
                  </IconButton>
              </Tooltip>
          )
        },
      ]

      return (
          <div className="App-body">
            <div className="row">
              <AddTraining addTraining={this.addTraining} loadTrainings={this.loadTrainings} />
              <CSVLink style={{padding: 20}} data={this.state.trainings}>Download CSV</CSVLink>
            </div>
            <ReactTable data={this.state.trainings} columns={columns} filterable className="-highlight" defaultPageSize={10} />
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

  export default TrainingList;
