import './App.css';
import {getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider, signOut } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';
initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

function App() {
   
  const [user,setUset] = useState({})
  const auth  = getAuth();
  const handleGoogleSingin = () =>{
    
    signInWithPopup(auth, googleProvider)
    .then(result => {
         const {displayName, email ,photoURL } = result.user;

         const loggedInUser ={
           name  : displayName ,
           email : email,
           photo : photoURL
         };
        //  console.log(loggedInUser.photo)
         setUset(loggedInUser);
    })
    .catch((error) => {
      console.log(error.message);
    });
  } 
  const handlGithubSingIn = () =>{
    signInWithPopup(auth,gitHubProvider)
    .then(result => {
      const {displayName,photoURL,email} = result.user;
      // console.log(user);
      const loggedInUser = {
        name : displayName,
        photo : photoURL,
        email :  email
      }

      setUset(loggedInUser);
    })
  }
  const handleSingOut = () => {
    signOut(auth)
    .then(() =>{
      setUset({});
    })
  }
  return (
    <div className="App">
      {
         !user.name ?
          ( <div>
            <button onClick={handleGoogleSingin}>Google sing in</button>
            <button onClick={handlGithubSingIn}>GitHub Sing in</button>
            </div> )  :
         (<button onClick={handleSingOut}>Sing out</button>)
      }
       <br />
       {
         user.name && <div>
           <h2>Welcome {user.name}</h2>
           <h3>email : {user.email}</h3>
           <p>{user.photo}</p>
           <img src={user.photo} alt="" />
           </div>
       }
    </div>
  );
}

export default App;
