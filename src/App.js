import { useState } from "react";
import { app, database } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import './App.css';
import { async } from "@firebase/util";

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [users, setUsers] = useState([]);

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

  const getData = async () => {
    const data = await getDocs(dbInstance);
    setUsers(data.docs.map((item) => {
      return {...item.data(), id: item.id}
    }))
  }

  const updateData = (id) => {
    let dataToUpd = doc(database, "users", id)
  }

  const deleteData = (id) => {
    let dataToDel = doc(database, "users", id);
    deleteDoc(dataToDel)
    .then(() => {
      alert("Data deleted")
    })
    .catch((err) => {
      console.log(err)
    })
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
       <button onClick={getData}>Get Data</button>

       {users.map((user) => {
         return(
           <div>
             <p>{user.name}</p>
             <p>{user.email}</p>
             <button onClick={() => updateData(user.id)}>Update</button>
             <button onClick={() => deleteData(user.id)}>Delete</button>
           </div>
         )
       })}
    </div>
  );
}

export default App;
