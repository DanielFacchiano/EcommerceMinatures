import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

// Adapted example from here, for 
// https://www.telerik.com/blogs/how-to-build-forms-with-react-the-easy-way
const Auth = ({signIn, setSignIn}) => {

  const [toggleSignUp, setToggleSignUp] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const toggleMode =() =>
  {
    setToggleSignUp(!toggleSignUp);
  }

  const handleSignUp = (event) =>
  {
    event.preventDefault();
    console.log(`Shooting ${userName}, ${password} and ${email} to the backend through Axios!`);
    console.log("Oh man, that was succesful, totally setting up cookies and redirecting to store")
    setSignIn(false)
  }

  const handleSignIn = (event) =>
  {
    event.preventDefault();
    console.log(`Shooting ${userName} and ${password} to the backend through Axios!`);
    console.log("Oh man, that was succesful, totally setting up cookies and redirecting to store")
    setSignIn(false)
  }

  return (
    <div className ="container" id="auth__form-container">
      <div className="row">
        <div className="col">
          <form onSubmit={toggleSignUp ? handleSignUp : handleSignIn}>
            <h1>{toggleSignUp ? 'Sign Up' : 'Sign In'}</h1>
            <p>User Name:
            <input
              name="userName"
              type="text"
              value={userName}
              onChange={event => setUserName(event.target.value)}
              required />
              </p>
              <p>Password:
            <input
              name="password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required />
              </p>
              {toggleSignUp ? (   
              <p>Email:
              <input
              name="email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required />
              </p>
              ):""}
              <button className=" btn btn-success">Submit</button>
              </form>
                Toggle Sign In and Sign Up:
                <div onClick={toggleMode} style={{cursor : 'pointer', color: 'blue'}} >
                    {toggleSignUp ? 'Sign Up' : 'Sign In'}
                </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
