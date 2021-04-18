import logo from './Logo.PNG';
import './ViewEvents.css';
import PropTypes from 'prop-types';
import React from 'react';

export const ViewEvents = () => {
    // Server will send over data from db to populate page
    // Later will use api on server retrieval?
    const mock_data = [ {'name':'Event1', 'host': 'host', 'place': 'place', 'time': 'time', 'attendees': ['Guest1']}, 
    {'name':'Event2', 'host': 'host2', 'place': 'place', 'time': 'time', 'attendees': [""]}, 
    {"name": "Event3", 'host': 'host3', 'place': 'place', 'time': 'time', 'attendees': ['Guest1', 'Guest2']}, 
    {"name": "Event4", 'host': 'host4', 'place': 'place', 'time': 'time', 'attendees': ['Guest1', 'Guest2', 'Guest3']} ]; // temporary, not used
    // console.log(mock_data[0]['attendees']);
    const my_name = "host";
    return (
        <div className="container">
            <h2>Events</h2>
            <p>NOTE: Using mocked data for now</p>
            {mock_data.map((items, index) => (
                <Event 
                    my_name={my_name}
                    hosts={mock_data[index]['host']}
                    name={mock_data[index]['name']}
                    time={mock_data[index]['time']}
                    place={mock_data[index]['place']}
                    attendees={mock_data[index]['attendees']}
                />
            ))}
        </div>
    );
};

const Event = (props) => {
    Event.propTypes = {
        my_name: PropTypes.string.isRequired,
        hosts: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        place: PropTypes.string.isRequired,
        attendees: PropTypes.arrayOf(PropTypes.string),
    };
    Event.defaultProps = {
        attendees: null,
    };
    
    function add_to_attendees(name){
        // Still have to change the main array to display on screen, waiting for db
        const current_attendees = props.attendees;
        current_attendees.push(name);
        // console.log(current_attendees);
    }
    
    return (
    <div className="box">
        <div className="picture"><img className="loc-thumbnail" src={logo} alt="location picture" /></div>
        <h4>{ props.name }</h4>
        <ul>
        <li> { props.hosts } </li>
        <li> { props.time } </li>
        <li> { props.place } </li>
        {props.attendees.length === 0 ? null:<li>{ props.attendees.toString() }</li>}
        </ul>
        {props.hosts === props.my_name ? null:<div className="center">
        <button type="button" onClick={() => add_to_attendees(props.my_name)}>Request Join</button>
        </div>}
    </div>
    );
};
