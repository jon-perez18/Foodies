import "./App.css";
import { Recommendation } from "./Recommendation";
import { EventInfo } from "./EventInfo";
import { DisplayEventInfo } from "./DisplayEventInfo";
import { React, useState, useRef, useEffect } from "react";
import io from "socket.io-client";

const socket = io(); // Connects to socket connection

function Search() {
  const addy = useRef(null);
  const event_name_ref = useRef(null);
  const event_description_ref = useRef(null);
  const event_date_ref = useRef(null);
  const event_time_ref = useRef(null);
  const [store_address, set_address] = useState(null);
  const [radio, setRadio] = useState("5000");
  const [isCreate, setCreate] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [recommendations, setRecom] = useState({});
  const [isContunueClick, setContinueClick] = useState(false);
  const [Event, setEvent] = useState({});
  function save_info() {
    const input_addy = addy.current.value;
    set_address(input_addy);
    console.log(store_address);
    setContinueClick((prevClickContinue) => true);
    socket.emit("recs", { addy: input_addy, radio: radio });
  }
  function onPressCreate(key) {
    setCreate((preCreate) => true);
    //console.log(key)
    const restaurant = key;
    const location = recommendations[key];
    console.log(restaurant, location);
    socket.emit("recommendations", {
      restaurant: restaurant,
      location: location,
    });
  }
  function onPressSubmit() {
    const event_name = event_name_ref.current.value;
    const event_description = event_description_ref.current.value;
    const event_date = event_date_ref.current.value;
    const event_time = event_time_ref.current.value;
    setSubmit((prevSubmit) => true);
    socket.emit("event_info", {
      event_name: event_name,
      event_description: event_description,
      event_date: event_date,
      event_time: event_time,
    });
  }
  useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on("recomendations", (data) => {
      console.log("recoomendation", data);
    });

    socket.on("recs", (data) => {
      console.log(data.results);
      const results = data.results;
      setRecom((prevRecom) => results);
    });
    socket.on("event_info", (data) => {
      //console.log(data['event_info']);
      const event_info = data.event_info;
      console.log(event_info);
      setEvent((prevEvent) => event_info);
    });
  }, []);

  console.log("Event", Event);

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
                checked={radio === "5000"}
                value="5000"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <label>5000 meters</label>
              <br />

              <input
                type="radio"
                checked={radio === "10000"}
                value="10000"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <label>10000 meters</label>
              <br />

              <input
                type="radio"
                checked={radio === "25000"}
                value="25000"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <label>25000 meters</label>
              <br />

              <input
                type="radio"
                checked={radio === "39000"}
                value="39000"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <label>39000 meters</label>
              <br />
              <br />
              <button type="button" name="continue" onClick={() => save_info()}>
                Continue
              </button>
              <button>View Events </button>
            </form>
          </div>
        </header>
      </div>
    );
  } else {
    if (isCreate === false) {
      return (
        <div className="App">
          <header className="App-header">
            <Recommendation
              onPressCreate={onPressCreate}
              recommendations={recommendations}
            />
          </header>
        </div>
      );
    } else {
      if (isSubmit === false) {
        return (
          <div className="App">
            <header className="App-header">
              <EventInfo
                event_name_ref={event_name_ref}
                event_description_ref={event_description_ref}
                event_date_ref={event_date_ref}
                event_time_ref={event_time_ref}
                onPressSubmit={onPressSubmit}
              />
            </header>
          </div>
        );
      }
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>Congratulation Event Created Successfully</h2>
        <br></br>
        <br></br>

        <DisplayEventInfo Event={Event} />
      </header>
    </div>
  );
}

export default Search;
