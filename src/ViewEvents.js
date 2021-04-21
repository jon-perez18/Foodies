import './ViewEvents.css';
import PropTypes from 'prop-types';
import { React, useState, useEffect } from 'react';
import logo from './Logo.PNG';
// import io from 'socket.io-client';

function ViewEvents(props) {
  const { socket, userName } = props;
  const [eventData, setEvents] = useState([]);

  useEffect(() => {
    socket.on('events', (data) => {
      setEvents(() => data.events);
    });
  }, []);

  console.log('view event page', eventData);
  const myName = userName;
  return (
    <div>
      <h1>{ myName }</h1>
      <div className="container">
        <h2>Events</h2>
        {eventData.map((items, index) => (
          <Event
            myName={myName}
            hosts={eventData[index][0]}
            name={eventData[index][1]}
            description={eventData[index][2]}
            place={eventData[index][3]}
            address={eventData[index][4]}
            date={eventData[index][5]}
            time={eventData[index][6]}
            attendees={eventData[index][7]}
            socket={socket}
          />
        ))}
      </div>
    </div>
  );
}
ViewEvents.propTypes = {
  socket: PropTypes.instanceOf(Object).isRequired,
  userName: PropTypes.string.isRequired,
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
    socket: PropTypes.instanceOf(Object).isRequired,
  };

  const {
    myName, hosts, name, place, address, date, time, attendees, socket,
  } = props;

  function addToAttendees(checkEvent, addUser, toList) {
    // Still have to change the main array to display on screen, waiting for db
    // const currentAttendees = toList;
    console.log(checkEvent, addUser, toList);
    socket.emit('change_attendees', { name: checkEvent, user: addUser, attendeeList: toList });
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
        <li>
          { attendees }
        </li>
      </ul>
      {hosts === myName ? null : (
        <div className="center">
          <button type="button" onClick={() => addToAttendees(name, myName, attendees)}>Request Join</button>
        </div>
      )}
    </div>
  );
};

export default ViewEvents;
