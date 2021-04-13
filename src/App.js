import './App.css';
import {
  React, useState, useRef, useEffect,
} from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection


function App() {
  const addy = useRef(null);
  const [store_address, set_address] = useState(null);
  const [radio,setRadio] = useState("5000");

  function save_info() {
    const input_addy = addy.current.value;
    set_address(input_addy);
    console.log(store_address);
    socket.emit('recs', { addy: store_address, radio: radio });
  }


  return (
    <div className="App">
      <header className="App-header">

      <input type="input" ref={addy} className="form__field" placeholder='Enter an address' />

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
        <button type="button" name="continue" onClick={save_info}>
          Continue
        </button>
        </form>
    
        
        </header>
        
    </div>
  );
}

export default App;
