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
      name="email" />
      <input 
      className="input-field"
      placeholder="Password" 
      type="password" 
      name="password" />
       <button>Sign Up</button>
    </div>
  );
}

export default App;
