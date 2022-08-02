import './App.css';

function App() {
  const handleInput = () => {

  }

  const handleSubmit = () => {}

  return (
    <div className="App-header">
      <input 
      className="input-field"
      placeholder="Email" 
      type="email" 
      name="email" 
      onChange={(e) => handleInput(e)} 
      />
      <input 
      className="input-field"
      placeholder="Password" 
      type="password" 
      name="password" 
      onChange={(e) => handleInput(e)} 
      />
       <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
}

export default App;
