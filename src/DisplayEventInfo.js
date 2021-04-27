import { React } from 'react';
import PropTypes from 'prop-types';

function DisplayEventInfo(props) {
  const {
    Event,
  } = props;
  console.log(Event.host, Event.event_name);
  DisplayEventInfo.propTypes = {
    Event: PropTypes.instanceOf(Object).isRequired,
  };

  return (
    <div>
      <h3>
        Host:
        {' '}
        { Event.host }
      </h3>
      <h3>
        Event Name:
        {' '}
        { Event.event_name }
      </h3>
      <h3>
        Event Description:
        {' '}
        { Event.event_description }
      </h3>
      <h3>
        Restaurant:
        {' '}
        { Event.restaurant }
      </h3>
      <h3>
        Location:
        {' '}
        { Event.location }
      </h3>
      <h3>
        Event Date:
        {' '}
        { Event.event_date }
      </h3>
      <h3>
        Event Time:
        {' '}
        { Event.event_time }
      </h3>
    </div>
  );
}

export default DisplayEventInfo;
