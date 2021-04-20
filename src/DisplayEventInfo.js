import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
export function DisplayEventInfo({ Event }) {
  const event_name = Event["event_name"];
  const event_description = Event["event_description"];
  const event_date = Event["event_date"];
  const event_time = Event["event_time"];
  const host = Event["host"];
  const restaurant = Event["restaurant"];
  const location = Event["location"];
  return (
    <div>
      <h3>Host: {host}</h3>
      <h3>Event Name: {event_name}</h3>
      <h3>Event Description: {event_description} </h3>
      <h3>Restaurant: {restaurant}</h3>
      <h3>Location: {location}</h3>
      <h3>Event Date: {event_date}</h3>
      <h3>Event Time: {event_time}</h3>
      <button>View other Events</button>

      <button>Create New Event</button>
    </div>
  );
}
