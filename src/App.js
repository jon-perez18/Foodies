import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <input type="input" className="form__field" placeholder='Enter an address' />
        
        <p>
        Enter your desired range
        </p>
      
        
        <input type="radio" id="one" name="range" value="5000"/>
  <label for="one">5000 meters</label>
  <input type="radio" id="two" name="range" value="10,000"/>
  <label for="two">10,000 meters</label>
  <input type="radio" id="three" name="range" value="25,000"/>
  <label for="three">25,000 meters</label>
  <input type="radio" id="four" name="range" value="40,000"/>
  <label for="four">40,000 meters</label>
  <br/>
  <button type="button" name="input">
          Continue
        </button>
        </header>
        
    </div>
  );
}

export default App;
