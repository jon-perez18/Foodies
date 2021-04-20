import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
export function EventInfo({
  event_name_ref,
  event_description_ref,
  event_date_ref,
  event_time_ref,
  onPressSubmit,
}) {
  return (
    <div>
      <h2>Create Event</h2>
      <br></br>
      <label>
        Event Name
        <input
          type="text"
          ref={event_name_ref}
          name="event_name"
          placeholder="Enter Event Name Here"
        ></input>
        <br></br>
        <br></br>
      </label>

      <label>
        Event Desription
        <textarea
          type="textarea"
          ref={event_description_ref}
          name="event_description"
          placeholder="Enter Description Here"
        ></textarea>
      </label>
      <br></br>
      <br></br>
      <label>
        Event Date
        <input type="date" ref={event_date_ref} name="event_date"></input>
      </label>

      <br></br>
      <br></br>
      <label>
        Event Time
        <input
          type="time"
          ref={event_time_ref}
          id="appt"
          name="appt"
          required
        ></input>
      </label>
      <br></br>
      <br></br>
      <button onClick={() => onPressSubmit()}> Submit </button>
    </div>
  );
}
