import logo from './Logo.PNG';
import './ViewEvents.css';
import PropTypes from 'prop-types';
import { React, useState, useEffect } from 'react';
// import io from 'socket.io-client';

export function ViewEvents(props){
    const { socket } = props;
    const[eventData, setEvents] = useState([]);
    
    useEffect(() => {
        socket.on("events", (data) => {
            setEvents(() => data.events);
        });
    }, []);
    console.log("view event page", eventData);
    const my_name = "username";
    return (
        <div>
        <h1>{ my_name }</h1>
        <div className="container">
            <h2>Events</h2>
            {eventData.map((items, index) => (
                <Event
                    key={index}
                    my_name={my_name}
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
    socket: PropTypes.object.isRequired,
};

const Event = (props) => {
    Event.propTypes = {
        key: PropTypes.number.isRequired,
        my_name: PropTypes.string.isRequired,
        hosts: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        place: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
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
        <li>Hosted by: { props.hosts }</li>
        <li>Where: { props.place } </li>
        <li> { props.address } </li>
        <li>When: { props.date } { props.time } </li>
        </ul>
        {props.hosts === props.my_name ? null:<div className="center">
        <button type="button" onClick={() => add_to_attendees(props.my_name)}>Request Join</button>
        </div>}
    </div>
  );
};
