import logo from './logo.PNG';
import './ViewEvents.css';
import React from 'react';

function ViewEvents(){
    // Server will send over data from db to populate page
    // Later will use api on server retrieval?
    const mock_data = [ {'event1':'name1'}, {'event2':'name2'} ]; // temporary, not used
    const host = 'host';
    const attendees = ['user 1 ','user 2'];
    const name = 'event name';
    const time = 'time of event';
    const place = 'restaurant';
    
    return (
        <div className="container">
        <h2>Events</h2>
        <div className="box">
        <div className="picture"><img className="loc-thumbnail" src={logo} alt="location picture" /></div>
        <h4>{ name }</h4>
        <ul>
        <li> { host } </li>
        <li> { time } </li>
        <li> { place } </li>
        <li> { attendees } </li>
        </ul>
        <div className="center">
        <button type="button">Request Join</button>
        </div>
        </div>
        </div>
    );
}

export default ViewEvents;