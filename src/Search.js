import './App.css';
import {Recommendation} from './Recommendation'

import {
  React, useState, useRef, useEffect,
} from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection


function Search() {
  const addy = useRef(null);
  const event_name_ref = useRef(null);
  const event_description_ref = useRef(null);
  const event_date_ref = useRef(null);
  const event_time_ref = useRef(null);
  const [store_address, set_address] = useState(null);
  const [radio,setRadio] = useState("5000");
  const [isCreate,setCreate] = useState(false)
  const [recommendations, setRecom] = useState({})
  const [isContunueClick, setContinueClick] = useState(false);
  function save_info() {
    const input_addy = addy.current.value;
    set_address(input_addy);
    console.log(store_address);
    setContinueClick(prevClickContinue=>true);
    socket.emit('recs', { addy: input_addy, radio: radio });
  }
  function onPressCreate(key){
    setCreate(preCreate=>true);
    //console.log(key)
    const restaurant = key;
    const location = recommendations[key];
    console.log(restaurant, location);
    socket.emit('recommendations', {restaurant:restaurant,location:location});
  }
  function onPressSubmit(){
    const event_name = event_name_ref.current.value;
    const event_description =event_description_ref.current.value;
    const event_date = event_date_ref.current.value;
    const event_time = event_time_ref.current.value;
    socket.emit('event_info',{event_name:event_name,event_description:event_description,event_date:event_date,event_time:event_time})
    
  }
  useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
     socket.on('recomendations', (data) => {
      console.log("recoomendation",data);

  
    });
    
    socket.on('recs',(data)=>{
        console.log(data["results"])
        const results = data["results"]
        setRecom(prevRecom=>results)
        
    })
  }, []);


  return (
    <div className="App">
      <header className="App-header">

      {isContunueClick === false ? (<div><input type="input" ref={addy} className="form__field" placeholder='Enter an address' />
        
        <form>
        <h3>Enter your desired range</h3>
        
        <input type="radio"
        checked={radio === "5000"}
        value="5000"
        onChange={(e)=>{ setRadio(e.target.value)}}/>
        <label>5000 meters</label>
        <br/>
        
        <input type="radio"
        checked={radio === "10000"}
        value="10000"
        onChange={(e)=>{ setRadio(e.target.value)}}/>
        <label>10000 meters</label>
        <br/>
        
        <input type="radio"
        checked={radio === "25000"}
        value="25000"
        onChange={(e)=>{ setRadio(e.target.value)}}/>
        <label>25000 meters</label>
        <br/>
        
        <input type="radio"
        checked={radio === "39000"}
        value="39000"
        onChange={(e)=>{ setRadio(e.target.value)}}/>
        <label>39000 meters</label>
        <br/>
        <br/>
        <button type="button" name="continue" onClick={()=>save_info()}>
          Continue
        </button>
        </form>
        </div>
        ):((<Recommendation onPressCreate={onPressCreate} recommendations={recommendations}/>
        ))}
    
       {(isCreate === true)?(<div>
            <br></br>
            <br></br>
            <br></br>
            <label>Event Name
                <input type="text" ref={event_name_ref} name="event_name" placeholder="Enter Event Name Here"></input>
                <br></br>
                <br></br>
                <br></br>
            </label>
            
           <label>Desription
                <textarea type="textarea"  ref={event_description_ref}name="event_description" placeholder="Enter Description Here"></textarea>
            </label>
         <br></br>
          
           <label>Event Date
                <input type="date"  ref={event_date_ref}name="event_date" ></input>
            </label>
            <label>Event Time
                <input type="time" ref={event_time_ref} id="appt" name="appt"
                required></input>
            </label>
            
         <br></br>
         
         <br></br>
        <button onClick={()=> onPressSubmit()}> Submit </button>
        </div>):("")}
        
        </header>
        
    </div>
  );
}

export default Search;
