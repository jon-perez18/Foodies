import './App.css';
import {
  React, useEffect,
} from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import io from 'socket.io-client';
import Search from './Search';
import { Login } from './Login';
import Logout from './Logout';
import ViewEvents from './ViewEvents';

const socket = io(); // Connects to socket connection

function App() {
  useEffect(() => {
    socket.on('login', (dataName, dataEmail) => {
      console.log(dataName, dataEmail);
      alert(dataName.get('username'));
    });
  }, []);

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
              <ViewEvents socket={socket} onClick={() => socket.emit('events')} />
            </Route>
            <Route path="/search">
              {' '}
              <Search socket={socket} />
            </Route>
            <Route path="/">
              {' '}
              <Login socket={socket} />
              <Logout socket={socket} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
