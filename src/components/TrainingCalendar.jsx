import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Calendar from 'react-calendar';
import moment from 'moment';

const localizer = BigCalendar.momentLocalizer(moment)

export default class TrainingCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = { trainings: [], events: [] };
  }

  componentDidMount() {
    this._loadTraining();
  }

  _loadTraining = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings/')
    .then((response) => response.json())
    .then((responseData) => {
      let events = responseData.content.map( function (training) {
        return {
          title: training.activity,
          start: moment(training.date).toDate(),
          end: moment(training.date).add(training.duration, 'm').toDate(),
          allDay: false,
        }
      });
      this.setState({
        trainings: responseData.content,
        events: events,
      });
    })
  }

  render() {
    return (
      <div>
        <BigCalendar
          localizer={localizer}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    );
  }
}
