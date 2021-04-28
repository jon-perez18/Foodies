import './App.css';
import PropTypes from 'prop-types';
import {
  React, useState, useRef, useEffect,
} from 'react';
import Recommendation from './Recommendation';
import EventInfo from './EventInfo';
import DisplayEventInfo from './DisplayEventInfo';

import MyMap from './MyMap';

function Search(props) {
  const { socket, userName, history } = props; // eslint-disable-line no-unused-vars
  const addy = useRef(null);
  const eventNameRef = useRef(null);
  const eventDescriptionRef = useRef(null);
  const eventDateRef = useRef(null);
  const eventTimeRef = useRef(null);
  const [storeAddress, setAddress] = useState(null); // eslint-disable-line no-unused-vars
  const [radio, setRadio] = useState('5000');
  const [isCreate, setCreate] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [recommendations, setRecom] = useState({});
  const [isContunueClick, setContinueClick] = useState(false);
  const [Event, setEvent] = useState({});
  const [phone, setPhone] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [isMapReady, setMap] = useState(false);
  function saveInfoFunc() {
    const inputAddy = addy.current.value;
    setAddress(inputAddy);
    console.log(storeAddress);
    setContinueClick((prevClickContinue) => true); // eslint-disable-line no-unused-vars
    socket.emit('recs', {
      addy: inputAddy, radio, ratings, phone, lat, long,
    });
  }
  function onPressCreate(key) {
    setCreate((preCreate) => true); // eslint-disable-line no-unused-vars
    // console.log(key)
    const restaurant = key;
    const location = recommendations[key];
    console.log(restaurant, location);
    socket.emit('recommendations', {
      restaurant,
      location,
    });
  }
  function onPressSubmit() {
    const host = userName;
    const eventName = eventNameRef.current.value;
    const eventDescription = eventDescriptionRef.current.value;
    const eventDate = eventDateRef.current.value;
    const eventTime = eventTimeRef.current.value;

    setSubmit((prevSubmit) => true); // eslint-disable-line no-unused-vars
    socket.emit('event_info', {
      host,
      eventName,
      eventDescription,
      eventDate,
      eventTime,
    });
  }
  useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('recomendations', (data) => { // eslint-disable-line no-unused-vars
      console.log('recoomendation', data);
    });

    socket.on('recs', (data) => {
      console.log(data);
      const { results } = data;
      console.log(data.ratings);
      setRecom((prevRecom) => {
        let tempRecom = prevRecom;
        tempRecom = results;
        return tempRecom;
      }); // eslint-disable-line no-unused-vars
      setPhone((prevPhone) => {
        let tempPhone = prevPhone;
        tempPhone = data.phone;
        return tempPhone;
      });
      setRatings((prevRatings) => {
        let tempRatings = prevRatings;
        tempRatings = data.ratings;
        return tempRatings;
      });
      setLat((prevLat) => {
        let tempLat = prevLat;
        tempLat = data.lat;
        return tempLat;
      });
      setLong((prevLong) => {
        let tempLong = prevLong;
        tempLong = data.long;
        return tempLong;
      });
      setMap(true);
    });
    socket.on('event_info', (data) => {
      console.log(data.event_info);
      const eventInfo = data.event_info;
      console.log(eventInfo);
      setEvent((prevEvent) => eventInfo); // eslint-disable-line no-unused-vars
      console.log(Event);
    });
  }, []);

  if (isContunueClick === false) {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <input
              type="input"
              ref={addy}
              className="form__field"
              placeholder="Enter an address"
            />

            <form>
              <h3>Enter your desired range</h3>

              <input
                type="radio"
                checked={radio === '5000'}
                value="5000"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <label htmlFor="metersLabel">5000 meters</label>
              <br />

              <input
                type="radio"
                checked={radio === '10000'}
                value="10000"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <label htmlFor="10000Meter">10000 meters</label>
              <br />

              <input
                type="radio"
                checked={radio === '25000'}
                value="25000"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <label htmlFor="25000Meter">25000 meters</label>
              <br />

              <input
                type="radio"
                checked={radio === '39000'}
                value="39000"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <label htmlFor="39000Meter">39000 meters</label>
              <br />
              <br />
              <button type="button" name="continue" onClick={() => saveInfoFunc()}>
                Continue
              </button>
            </form>
          </div>
        </header>
      </div>
    );
  }
  if (isCreate === false) {
    return (
      <div>
        <div className="recom">
          <header className="App-header">
            <Recommendation
              onPressCreate={onPressCreate}
              recommendations={recommendations}
            />
          </header>
        </div>
        {isMapReady === true ? (
          <MyMap
            recommendations={recommendations}
            onPressCreate={onPressCreate}
            ratings={ratings}
            phone={phone}
            lat={lat}
            long={long}
          />
        ) : (' ')}
      </div>
    );
  }
  if (isSubmit === false) {
    return (
      <div className="App">
        <header className="App-header">
          <EventInfo
            eventNameRef={eventNameRef}
            eventDescriptionRef={eventDescriptionRef}
            eventDateRef={eventDateRef}
            eventTimeRef={eventTimeRef}
            onPressSubmit={onPressSubmit}
          />
        </header>
      </div>
    );
  }
  console.log(Event);
  return (
    <div className="App">
      <header className="App-header">
        <h2>Congratulation Event Created Successfully</h2>
        <br />
        <br />
        <DisplayEventInfo Event={Event} />
      </header>
    </div>
  );
}

Search.propTypes = {
  socket: PropTypes.instanceOf(Object).isRequired,
  userName: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};
export default Search;
