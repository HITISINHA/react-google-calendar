import React from 'react';
import moment from 'moment';

import BigCalendar from 'react-big-calendar';
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

import { getEvents, calendarUrls } from '../../events';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: [],
      events: []
    }

    this.isFiltered = (ev) => {
      return this.state.filters.includes(ev.category);
    }
  }

  onCheckboxChange(e) {
    const filters = this.state.filters;
    let index;

    if (e.target.checked) {
      filters.push(e.target.value);
    } else {
      index = filters.indexOf(e.target.value);
      filters.splice(index, 1);
    }

    this.setState({filters: filters});

    getEvents((events) => {
      let filteredEvents = events.filter(this.isFiltered);
      this.setState({events: filteredEvents});
    });

    console.log(filters);
  }

  componentDidMount() {
    this.onCheckboxChange();
  }

  render() {
    const checkboxes = calendarUrls.map(cal =>
        <div className={`checkboxGroup checkboxGroup_${cal.category}`} key={cal.url}>
          <input id={cal.category} type="checkbox" value={cal.category} onChange={this.onCheckboxChange.bind(this)} />
          <label htmlFor={cal.category}>
            {cal.category}
          </label>
        </div>
    );

    function eventColor(event, start, end, isSelected) {
      return { className: `rbc-event_${event.category}` }
    };

    return (
      <div>
        <form className="checkboxForm">
          {checkboxes}
        </form>

        <div className="calendar">
          <BigCalendar
            popup
            selectable
            events={this.state.events}
            eventPropGetter={eventColor}
            onSelectEvent={event => console.log(event.title)}
            views={['month', 'week', 'day']}
          />
        </div>
      </div>
    )
  }
}

export default App;
