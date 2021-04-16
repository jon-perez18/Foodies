import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Logout from './Logout';

function App() {
  return (
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
