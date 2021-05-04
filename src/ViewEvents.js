import './ViewEvents.css';
import './App.css';
import PropTypes from 'prop-types';
import { React, useState, useEffect } from 'react';
import Logout from './Logout';
import logo from './Logo.PNG';

function ViewEvents(props) {
  const { socket, userName } = props;
  const [eventData, setEvents] = useState([]);

  useEffect(() => {
    socket.on('events', (data) => {
      setEvents(() => data.events);
    });
  }, []);

  const myName = userName;
  return (
    <div>
      <div className="logout-heading">
        <img id="logo" src={logo} alt="App logo" />
        &ensp; Foodies
        <div id="logout-button">
          <Logout />
        </div>
      </div>

      <div className="main-container">
        <h2>{ myName }</h2>
        <div className="container">
          <h1>Events</h1>
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
    description: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    attendees: PropTypes.arrayOf(PropTypes.string).isRequired,
    socket: PropTypes.instanceOf(Object).isRequired,
  };

  const {
    myName, hosts, name, description, place, address, date, time, attendees, socket,
  } = props;

  function addToAttendees(checkEvent, hostName, restaurant, addUser, toList) {
    // Still have to change the main array to display on screen, waiting for db
    // console.log(checkEvent, addUser, toList);
    socket.emit('change_attendees', {
      name: checkEvent, host: hostName, place: restaurant, user: addUser, attendeeList: toList,
    });
  }
  function leaveEvent(checkEvent, hostName, restaurant, addUser, toList) {
    // console.log(checkEvent, addUser, toList);
    socket.emit('leave_event', {
      name: checkEvent, host: hostName, place: restaurant, user: addUser, attendeeList: toList,
    });
  }
  return (
    <div className="box">
      <div className="front">
        <div className="picture">
          <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer"><img className="loc-thumbnail" src={logo} alt="location" /></a>
        </div>
        <h4>{ name }</h4>
        <ul>
          <li>
            Hosted by:
            {' '}
            { hosts }
          </li>
          <li>
            Where:
            {' '}
            { place }
          </li>
          <li>
            {' '}
            { address }
            {' '}
          </li>
          <li>
            When:
            {' '}
            { date }
            {' '}
            { time }
            {' '}
          </li>
          <li>
            Attending:
            {' '}
            {
          attendees.map((item, index) => <span>{ (index ? ', ' : '') + item }</span>)
          }
          </li>
        </ul>
        {hosts === myName || attendees.includes(myName) ? null : (
          <div className="center">
            <button type="button" onClick={() => addToAttendees(name, hosts, place, myName, attendees)}>Request Join</button>
          </div>
        )}
        {
        hosts !== myName && attendees.includes(myName) ? (
          <div className="center">
            <button type="button" onClick={() => leaveEvent(name, hosts, place, myName, attendees)}>Leave Event</button>
          </div>
        ) : null
      }
      </div>
      <div className="back">
        <h5>Event Description: </h5>
        <pre>
          {' '}
        &emsp;
          {description}
        </pre>
      </div>
    </div>
  );
};

export default ViewEvents;
