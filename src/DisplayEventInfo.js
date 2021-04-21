import { React } from 'react';
import PropTypes from 'prop-types';

function DisplayEventInfo(props) {
  const {
    eventName,
    eventDescription,
    eventDate,
    eventTime,
    host,
    restaurant,
    location,
  } = props;
  console.log(props);
  DisplayEventInfo.propTypes = {
    eventName: PropTypes.string.isRequired,
    eventDescription: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    eventTime: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    restaurant: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  };

  return (
    <div>
      <h3>
        Host:
        {host}
      </h3>
      <h3>
        Event Name:
        {eventName}
      </h3>
      <h3>
        Event Description:
        {eventDescription}
      </h3>
      <h3>
        Restaurant:
        {restaurant}
      </h3>
      <h3>
        Location:
        {location}
      </h3>
      <h3>
        Event Date:
        {eventDate}
      </h3>
      <h3>
        Event Time:
        {eventTime}
      </h3>

      <button type="button">Create New Event</button>
    </div>
  );
}

export default DisplayEventInfo;
