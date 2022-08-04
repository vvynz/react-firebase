import { useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app, database } from "./firebaseConfig";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";

import "./App.css";

export default function App2() {
  const [data, setData] = useState({});

  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();

  const collectionRef = collection(database, "users");

  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };

    setData({ ...data, ...newInput });
  };

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getData = () => {
    getDocs(collectionRef).then((res) => {
      console.log(
        res.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  const updData = () => {};

  return (
    <div className="App-header">
      <input
        name="email"
        placeholder="email"
        onChange={(e) => handleInput(e)}
      />
      <input
        name="password"
        placeholder="password"
        type="password"
        onChange={(e) => handleInput(e)}
      />
      <input 
      name="file"
      placeholder="Choose a file"
      type="file"
      onChange={(e) => setData(e.target.files[0])} />

      <button onClick={handleSubmit}>Submit</button>
      <button onClick={updData}>Update Data</button>
      <button onClick={googleSignIn}>Sign In</button>
    </div>
  );
}
