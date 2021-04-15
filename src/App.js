import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Recommendation } from './Recommendation';
const socket = io(); // socket for client




function App() {
 // const [recomendations, setRecom] = useState({});
 const [isCreate,setCreate] = useState(false)
  const recommendations = {res1:'add1',res2:'add2',res3:'add3',res4:'add4', res5:'add5'};
  function onPressCreate(){
    setCreate(preCreate=>true)
  }
  useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
     socket.on('recomendations', (data) => {
      console.log(data);

  
    });
  }, []);
  return (
    <div className="App">
        
        <Recommendation recommendations={recommendations}/>
    </div>
  );
}

export default App;
