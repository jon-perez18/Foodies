import './App.css';
import {
  React, useState,
} from 'react';
import {
  BrowserRouter as Router, Switch, Route,
  Link, withRouter, // eslint-disable-line no-unused-vars
} from 'react-router-dom';
import io from 'socket.io-client';
import Search from './Search';
import { Login } from './Login';
import Logout from './Logout'; // eslint-disable-line no-unused-vars
import ViewEvents from './ViewEvents';

const socket = io(); // Connects to socket connection

function App() {
  const [user, setUser] = useState(''); // eslint-disable-line no-unused-vars

  return (

    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link onClick={() => socket.emit('events')} to="/view">View Events</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/view">
              {' '}
              <ViewEvents socket={socket} userName={user} />
            </Route>
            <Route path="/search">
              {' '}
              <Search socket={socket} userName={user} />
            </Route>
            <Route path="/">
              {' '}
              <Login socket={socket} setUser={setUser} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;
