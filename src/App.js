import { useState } from "react";
import { app, database } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import './App.css';

function App() {
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const auth = getAuth();
  
  const handleInput = (e) => {
    let input = {[e.target.name]: e.target.value}

    setData({...data, ...input})
  }

  const handleSubmit = () => {
    console.log(data)
  }

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
