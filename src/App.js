
import Search from './Search';
import {
  React, useState, useRef, useEffect,
} from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection


function App() {
  

  return (
    <div class="App">
     <h1>Foodies App</h1>
         <Search />

    </div>
  );
}

export default App;

