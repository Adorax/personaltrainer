import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class AddTraining extends Component {
    constructor(props) {
        super(props);
        this.state = { date: moment().format("YYYY-MM-DDThh:mm"), duration: '', activity: '', customer: this.props.customer,open: false};
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    // Save training and load trainings and finally close modal
    handleSubmit = (event) => {
        event.preventDefault();
        let newTraining = {date: moment(this.state.date).format("YYYY-MM-DD"), duration: this.state.duration, activity: this.state.activity, customer: this.state.customer, };
        this.props.addTraining(newTraining);
        this.props.loadTrainings();
        this.handleClose();
    }
    handleClose = (e) => {
        this.setState({open: false});
    }



    render() {

      const { classes } = this.props;

      // Add training page doesn't fit to default size modal
      const addTrainingDialog = {
        position: 'absolute',
        width: '70%',
        marginTop: '450px',
        marginLeft: '-35%',
      };

      return (
        <div>
          <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={() => this.setState({open : true})/*this.refs.simpleDialog.show()*/}><AddIcon /> New Training </Button>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                scroll="body"
            >
              <DialogTitle id="form-dialog-title">{"Add a custome"}r</DialogTitle>
              <DialogContent >
                <TextField id="date" label="Date" placeholder="Date" margin="normal" name="date" onChange={this.handleChange} value={this.state.date} type="datetime-local"
                  className={classes.textField} InputLabelProps={{ shrink: true,}} /><br></br>
                <TextField id="duration" label="Duration" placeholder="Duration" margin="normal" name="duration"
                    onChange={this.handleChange} value={this.state.duration} className={classes.textField} /><br></br>
                <TextField id="activity" label="Activity" placeholder="Activity" margin="normal" name="activity"
                    onChange={this.handleChange} value={this.state.activity} className={classes.textField} /><br></br>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button style={{ margin: 10 }} variant="contained" color="secondary"
                  onClick={this.handleSubmit} autoFocus> <SaveIcon /> Save Training
                </Button>
              </DialogActions>
            </Dialog>
        </div>
      );
    }
}

AddTraining.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTraining);
