import { useState } from "react";
import { app, database } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import './App.css';

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const auth = getAuth();
  const dbInstance = collection(database, "users");

  const handleInput = (e) => {
    let input = {[e.target.name]: e.target.value}

    setData({...data, ...input})
  }

  const handleSubmit = () => {
    // signInWithEmailAndPassword(auth, data.email, data.password)
    // .then((res) => {
    //   console.log(res.user);
    // })
    // .catch((err) => {
    //   console.log(err.message);
    // });
    addDoc(dbInstance, data)
    .then(() => {
      alert("data sent!")
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  return (
    <div className="App-header">
      <input 
      className="input-field"
      placeholder="Name" 
      type="text" 
      name="name" 
      onChange={(e) => handleInput(e)} 
      />
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
       <button onClick={handleSubmit}>Add Data</button>
    </div>
  );
}

export default App;
