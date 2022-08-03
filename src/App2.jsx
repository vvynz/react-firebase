import { useState  } from "react";
import './App.css';

export default function App2() {
  const [data, setData] = useState({});

  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };

    setData({...data, ...newInput});
  }

  return(
    <div className="App-header">
      <input name="email" placeholder="email" onChange={(e) => handleInput(e)}/>
      <input name="password" placeholder="password" onChange={(e) => handleInput(e)}/>
      <button>Submit</button>
    </div>
  )
}