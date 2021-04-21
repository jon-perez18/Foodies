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
      <br />
      <label htmlFor="eventName">
        Event Name
        <input
          type="text"
          ref={eventNameRef}
          name="event_name"
          placeholder="Enter Event Name Here"
        />
        <br />
        <br />
      </label>

      <label htmlFor="eventDescription">
        Event Desription
        <textarea
          type="textarea"
          ref={eventDescriptionRef}
          name="event_description"
          placeholder="Enter Description Here"
        />
      </label>
      <br />
      <br />
      <label htmlFor="eventDate">
        Event Date
        <input type="date" ref={eventDateRef} name="event_date" />
      </label>

      <br />
      <br />
      <label htmlFor="eventTime">
        Event Time
        <input
          type="time"
          ref={eventTimeRef}
          id="appt"
          name="appt"
          required
        />
      </label>
      <br />
      <br />
      <button type="submit" onClick={() => onPressSubmit()}> Submit </button>
    </div>
  );
}

export default EventInfo;
