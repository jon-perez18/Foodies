import './App.css';
import Search from './Search';
import Login from './Login';
import Logout from './Logout';
import {
  React, useState, useRef, useEffect,
} from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

function App() {
  

  return (
//     <div class="App">
//      <h1>Foodies App</h1>
//          <Search />
     <div class="App">
     <h1>Foodies App</h1>
     <div class="login" id="hide">
         <Login />
         <br />
         <Logout />
     </div>
    </div>
  );
}

export default App;
