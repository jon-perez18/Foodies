import './ViewEvents.css';
import PropTypes from 'prop-types';
import { React, useState, useEffect } from 'react';
import logo from './Logo.PNG';
// import io from 'socket.io-client';

function ViewEvents(props) {
  const { socket } = props;
  const [eventData, setEvents] = useState([]);

  useEffect(() => {
    socket.on('events', (data) => {
      setEvents(() => data.events);
    });
  }, []);
  console.log('view event page', eventData);
  const myName = 'username';
  return (
    <div>
      <h1>{ myName }</h1>
      <div className="container">
        <h2>Events</h2>
        {eventData.map((items, index) => (
          <Event
            my_name={myName}
            hosts={eventData[index][0]}
            name={eventData[index][1]}
            description={eventData[index][2]}
            place={eventData[index][3]}
            address={eventData[index][4]}
            date={eventData[index][5]}
            time={eventData[index][6]}
          />
        ))}
      </div>
    </div>
  );
}
ViewEvents.propTypes = {
  socket: PropTypes.instanceOf(Object).isRequired,
};

const Event = (props) => {
  Event.propTypes = {
    myName: PropTypes.string.isRequired,
    hosts: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    attendees: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  const {
    myName, hosts, name, place, address, date, time, attendees,
  } = props;

  function addToAttendees(add) {
    // Still have to change the main array to display on screen, waiting for db
    const currentAttendees = attendees;
    currentAttendees.push(add);
    // console.log(current_attendees);
  }

  return (
    <div className="box">
      <div className="picture"><img className="loc-thumbnail" src={logo} alt="location" /></div>
      <h4>{ name }</h4>
      <ul>
        <li>
          Hosted by:
          { hosts }
        </li>
        <li>
          Where:
          { place }
        </li>
        <li>
          {' '}
          { address }
          {' '}
        </li>
        <li>
          When:
          { date }
          {' '}
          { time }
          {' '}
        </li>
      </ul>
      {hosts === myName ? null : (
        <div className="center">
          <button type="button" onClick={() => addToAttendees(myName)}>Request Join</button>
        </div>
      )}
    </div>
  );
};

export default ViewEvents;
