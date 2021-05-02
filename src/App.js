import './App.css';
import {
  React, useState,
} from 'react';
import {
  BrowserRouter as Router, Switch, Route,
  Link, useHistory, withRouter, // eslint-disable-line no-unused-vars
} from 'react-router-dom';
import io from 'socket.io-client';
import Search from './Search';
import { Login } from './Login';
import Logout from './Logout';
import ViewEvents from './ViewEvents';

const socket = io(); // Connects to socket connection

function App() {
  const [user, setUser] = useState(''); // eslint-disable-line no-unused-vars
  const history = useHistory();
  // const Button = withRouter(({history}) => {})

  return (

    <div className="App">
      <Router>
        <div>
          <div id="navbar">
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
          </div>
          <Switch>
            <Route path="/view">
              {' '}
              <ViewEvents socket={socket} userName={user} history={history} />
            </Route>
            <Route path="/search">
              {' '}
              <Search socket={socket} userName={user} history={history} />
            </Route>
            <Route path="/">
              {' '}
              <Login socket={socket} setUser={setUser} history={history} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;