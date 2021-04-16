import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Recommendation } from './Recommendation';
const socket = io(); // socket for client




function App() {
 // const [recomendations, setRecom] = useState({});
 const [isCreate,setCreate] = useState(false)
 const [recommendations, setRecom] = useState({})
 const [isContunueClick, setContinueClick] = useState(false);
 const addy = useRef(null);
 const [store_address, set_address] = useState(null);
 const [radio,setRadio] = useState("5000");
 
 function save_info() {
    const input_addy = addy.current.value;
    set_address(input_addy);
    console.log("store address",store_address);
    console.log("input addy", input_addy);
    setContinueClick(prevClickContinue=>true);
    socket.emit('recs', { addy: input_addy, radio: radio });}
    

  //const recommendations = {res1:'add1',res2:'add2',res3:'add3',res4:'add4', res5:'add5'};
  function onPressCreate(key){
    setCreate(preCreate=>true)
    //console.log(key)
    const restaurant = key;
    const location = recommendations[key]
    console.log(restaurant, location)
    socket.emit('recommendations', {restaurant:restaurant,location:location});
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
        <button type="button" name="continue" onClick={save_info}>
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
                <input type="text" name="event_name"></input>
                <br></br>
                <br></br>
                <br></br>
            </label>
            
           <label>Desription
                <textarea type="textarea" name="event_name"></textarea>
            </label>
         <br></br>
         <br></br>
        <button> Submit </button>
        </div>):("")}
        
        </header>
        
    </div>
  );
}

export default App;
