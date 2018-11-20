import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class AddTraining extends Component {
    constructor(props) {
        super(props);
        this.state = { date: '', duration: '', activity: '', customer: '',open: false};
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    // Save training and load trainings and finally close modal
    handleSubmit = (event) => {
        event.preventDefault();
        let newTraining = {date: this.state.date, duration: this.state.duration, activity: this.state.activity, customer: this.state.customer, };
        this.props.addTraining(newTraining);
        this.props.loadTrainings();
        this.refs.simpleDialog.hide();
    }
    handleClose = (e) => {
        this.setState({open: true});
    }



    render() {

      const { classes } = this.props;

      // Add training page doesn't fit to default size modal
      const addTrainingDialog = {
        width: '1000',
        height: '70%',
        top: '100',
        left: '100',
      };


      return (
        <div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div  className={classes.paper}>
              <Typography variant="h6" id="modal-title">
                Text in a modal
              </Typography>
              <Typography variant="subtitle1" id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </div>
          </Modal>

          <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={() => {/*this.refs.simpleDialog.show();*/ this.setState({open: true});}}><AddIcon /> New Training </Button>
          <SkyLight hideOnOverlayClicked dialogStyles={addTrainingDialog} ref="simpleDialog" title="Add a customer">
            <TextField id="date" label="Date" placeholder="Date" margin="normal" name="date"
              onChange={this.handleChange} value={this.state.date} /><br></br>
            <TextField id="duration" label="Duration" placeholder="Duration" margin="normal" name="duration"
                onChange={this.handleChange} value={this.state.duration} /><br></br>
            <TextField id="activity" label="Activity" placeholder="Activity" margin="normal" name="activity"
                onChange={this.handleChange} value={this.state.activity} /><br></br>
              <TextField id="customer" label="Customer" placeholder="Customer" margin="normal" name="customer"
                onChange={this.handleChange} value={this.state.customer} /><br></br>
              <Button style={{ margin: 10 }} variant="contained" color="secondary" onClick={this.handleSubmit}><SaveIcon /> Save Training </Button>
          </SkyLight>
        </div>
      );
    }
}


AddTraining.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTraining);
