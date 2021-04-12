import logo from './logo.PNG';
import './ViewEvents.css';
import PropTypes from 'prop-types';
import React from 'react';

export const ViewEvents = () => {
    // Server will send over data from db to populate page
    // Later will use api on server retrieval?
    const mock_data = [ {'name':'Event1', 'host': 'host', 'place': 'place', 'time': 'time', 'attendees': ['Guest1']}, 
    {'name':'Event2', 'host': 'host', 'place': 'place', 'time': 'time', 'attendees': ['**Check for no attendees**(Placeholder)']}, 
    {"name": "Event3", 'host': 'host', 'place': 'place', 'time': 'time', 'attendees': ['Guest1', 'Guest2']}, 
    {"name": "Event4", 'host': 'host', 'place': 'place', 'time': 'time', 'attendees': ['Guest1', 'Guest2', 'Guest3']} ]; // temporary, not used
    console.log(mock_data[0]['attendees']);
    
    return (
        <div className="container">
            <h2>Events</h2>
            {mock_data.map((items, index) => (
                <Event 
                    hosts={mock_data[index]['host']}
                    name={mock_data[index]['name']}
                    time={mock_data[index]['time']}
                    place={mock_data[index]['place']}
                    attendees={mock_data[index]['attendees'].toString()}
                />
            ))}
        </div>
    );
};

const Event = (props) => {
    Event.propTypes = {
        hosts: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        place: PropTypes.string.isRequired,
        attendees: PropTypes.arrayOf(PropTypes.string),
    };
    Event.defaultProps = {
        attendees: null,
    };
    
    return (
    <div className="box">
        <div className="picture"><img className="loc-thumbnail" src={logo} alt="location picture" /></div>
        <h4>{ props.name }</h4>
        <ul>
        <li> { props.hosts } </li>
        <li> { props.time } </li>
        <li> { props.place } </li>
        <li> { props.attendees } </li>
        </ul>
        <div className="center">
        <button type="button">Request Join</button>
        </div>
    </div>
    );
};


// add yourself to list of attendee if not already, show button if not attendee
// if your event, instead of join button just have text that says you're attending
