import './App.css';
import {
  React, useState, useRef, useEffect,
} from 'react';

function App() {
  const addy = useRef(null);
  const range = useRef(null);
  const [store_address, set_address] = useState(null);
  const [radio,setRadio] = useState("apple");
  const [isChecked, setIsChecked] = useState(false);
  
  function save_address() {
    const input_addy = addy.current.value;
    set_address(input_addy);
    console.log(store_address);
  }


  return (
    <div className="App">
      <header className="App-header">

      <input type="input" ref={addy} className="form__field" placeholder='Enter an address' />
        <button type="button" name="address" onClick={save_address}>
          Submit
        </button>
        <form>
        <h1>Enter your desired range</h1>
        
        <input type="radio"
        checked={radio === "apple"}
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
        checked={radio === "40000"}
        value="40000"
        onChange={(e)=>{ setRadio(e.target.value)}}/>
        <label>40000 meters</label>
        <br/>
        
        
        
        </form>
    
        
        </header>
        
    </div>
  );
}

export default App;
