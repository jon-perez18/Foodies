import './Search.css';
import { React } from 'react';
import PropTypes from 'prop-types';

function EventInfo(props) {
  const {
    eventNameRef,
    eventDescriptionRef,
    eventDateRef,
    eventTimeRef,
    onPressSubmit,
  } = props;

  EventInfo.propTypes = {
    eventNameRef: PropTypes.string.isRequired,
    eventDescriptionRef: PropTypes.string.isRequired,
    eventDateRef: PropTypes.string.isRequired,
    eventTimeRef: PropTypes.string.isRequired,
    onPressSubmit: PropTypes.func.isRequired,
  };

  return (
    <div>
      <h2>Create Event</h2>
      <article className="l-design-widht">
        <div className="card card--accent">
          <label htmlFor="eventName">
            Event Name
          </label>
          <br />
          <input
            type="text"
            ref={eventNameRef}
            name="event_name"
            placeholder="Enter Event Name Here"
          />
          <br />
          <br />

          <label htmlFor="eventDescription">
            Event Desription
          </label>
          <br />
          <textarea
            type="textarea"
            ref={eventDescriptionRef}
            name="event_description"
            placeholder="Enter Description Here"
          />
          <br />

          <label htmlFor="eventDate">
            Event Date
          </label>
          <br />
          <input type="date" ref={eventDateRef} name="event_date" />
          <br />

          <label htmlFor="eventTime">
            Event Time
          </label>
          <br />
          <input
            type="time"
            ref={eventTimeRef}
            id="appt"
            name="appt"
            required
          />
          <br />
          <br />

          <button type="submit" onClick={() => onPressSubmit()}> Submit </button>
        </div>
      </article>
    </div>
  );
}

export default EventInfo;
