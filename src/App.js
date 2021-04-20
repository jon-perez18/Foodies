import './App.css';
import Search from './Search';
import Login from './Login';
import Logout from './Logout';
import { ViewEvents } from './ViewEvents';

import {
  React, useState, useRef, useEffect,
} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

function App() {

//  <div class="login" id="hide">
//          <Login />
//          <br />
//          <Logout />
//      </div>  

  return (
//     <div class="App">
//      <h1>Foodies App</h1>
//          <Search />
     <div class="App">
     { //<h1>Foodies App</h1> 
     }
     <Router>
        <div>
            <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link onClick={() => socket.emit("events")} to="/view">View Events</Link></li>
            </ul>
            </nav>
            <Switch>
            <Route path="/view"> <ViewEvents socket={ socket } onClick={() => socket.emit("events")} /></Route>
            <Route path="/search"> <Search socket={ socket } /></Route>
            <Route path="/"> <Login socket={ socket }/> <Logout socket={ socket }/> </Route>
            </Switch>
        </div>
    </Router>
    </div>
  );
}

export default App;
