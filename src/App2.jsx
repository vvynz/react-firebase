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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import "./App.css";

export default function App2() {
  const [data, setData] = useState({});

  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();

  // a root reference
  const storage = getStorage();

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

  const handleFileInput = () => {
    // will give us name of the file (ex. "a.jpg"), type, size, date modified
    // console.log(data);

    // create a ref to the uploaded file
    const fileRef = ref(storage, data.name);

    //upload file
    const uploadTask = uploadBytesResumable(fileRef, data);

    //state_changed observer, called any time the state changes
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // observe state change events such as progress, pause, and resume
        // get task progress, including the num of bytes uploaded and the total num of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File is available at", downloadURL);
        });
      }
    );
  };

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

      <button onClick={handleSubmit}>Submit</button>
      <button onClick={updData}>Update Data</button>
      <button onClick={googleSignIn}>Sign In</button>

      <input
        name="file"
        type="file"
        onChange={(e) => setData(e.target.files[0])}
      />
      <button onClick={handleFileInput}>Upload File</button>
    </div>
  );
}
