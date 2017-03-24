import React, { Component } from 'react';
import moment from 'moment';

import BigCalendar from 'react-big-calendar';
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

import './App.css';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

import { getEvents } from '../../events';


class App extends Component {
  constructor() {
    super();

    this.state = {
      events: []
    }
  }

  componentDidMount() {
    getEvents((events) => {
      this.setState({events});
    });
  }

  render() {
    return (
      <div className="calendar">
        <BigCalendar
          popup
          selectable
          events={this.state.events}
          onSelectEvent={event => alert(event.title)}
          views={['month', 'week', 'day', 'agenda']}
        />
      </div>
    );
  }
}

export default App;
