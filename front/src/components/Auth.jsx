import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Citation for react form logic
// 3/7/2022
// Much of the form logic below is adapted example from here:
// https://www.telerik.com/blogs/how-to-build-forms-with-react-the-easy-way by TJ Van Toll

/*
  Various use states to hold the inputs the user might use on this page
  initially empty, these states update as the user types information in
  by detecting a change. Will hide the forms for signup when the sign in use 
  state is set, will also submit to a different route when this is the case.
*/
const Auth = ({signIn, setSignIn, setCartList, cartList}) => {

  const [toggleSignUp, setToggleSignUp] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  // switch between sign in and sign up
  const toggleMode =() =>
  {
    setToggleSignUp(!toggleSignUp);
  }

  /*  
    makes a call to the server route to create a user, passes it the various pieces of
    information required to do this. Uses axios to do this. if the response is good, we
    set our cookies with the correct data and we return to the handler which will 
    set sign up to false 
  */
  const createUser = async() =>{
    console.log("running create user")
    let url = "http://localhost:3005/auth/"
    var payload = {userName : userName, password : password, email : email, firstName: firstName, lastName: lastName }
    let res = await axios.post(url, payload);
    if (res.data.insertId != null)
    {
      cookies.set('userId', res.data.insertId, {sameSite: 'lax'});
      cookies.set('orderId', null, {sameSite: 'lax'});
      cookies.set('userName', userName, {sameSite: 'lax'});
      console.log("the userId in cookies is (auth)....")
      console.log(cookies.get("userId"));
      console.log("username is in cookies:")
      console.log(cookies.get("userName"));

      return true
    }
    return false
  }
  /*
    gets the order id corresponding to the current user id  by posting it 
    through axios and getting the servers response
  */
  const setOrder = async (userId) => 
  {
    let url = "http://localhost:3005/orders"
    let payload = {userId : userId }
    let res = await axios.post(url, payload);
    let data = res.data;
    cookies.set('orderId', data[0].orderId, {sameSite: 'lax'});
  }
  /*
    uses specific route to determine if a user actually exists
  */
  const verifyUsername =async() =>{
    let url = "http://localhost:3005/verification/"
    var payload = {userName : userName }
    let res = await axios.post(url, payload);
    console.log(res)
    return res
  }
  // handler for when a user is signing up, fires when sign up is toggled on
  // detects if user exists, if issues creating user with route will alert user
  const handleSignUp = async (event) =>
  {
    event.preventDefault();
    var exists = await verifyUsername();
    if (exists.data.length != 0){
      console.log(exists.data.length)
      alert("Username already registered, please choose a different one");
      return
    }

    var result = await createUser();
    if (result == true){
      await setCartList([]);
      setSignIn(false)
    }

    else{
      alert("something went wrong...")
    }
  }
  /*
    route to sign a user in, confirm a user is in the database
    then goes ahead and sets the cookies for this application
  */
  const getUser = async (orderId1) => {
    console.log("running get user")
    let url = "http://localhost:3005/auth/"
    var payload = {userName : userName, password : password}
    let res = await axios.patch(url, payload);
    console.log(res);
    if(res.data != null){
      cookies.set('userId', res.data, {sameSite: 'lax'});
      cookies.set('orderId', null, {sameSite: 'lax'});
      cookies.set('userName', userName, {sameSite: 'lax'});
      console.log("the userId in cookies is (auth)....")
      console.log(cookies.get("userId"));
      return true
    }
      return false
  }
  /*
    handler used when sign in button is clicked, will try to run get user
    and will alert the user if there is an error, resets the cart list
    and returns to shopping page on success
  */
  const handleSignIn = async (event) =>
  {
    event.preventDefault();
    var result = await getUser();
    if (result != true)
    {
      alert("sign in error of some assortment");
      return
    }
    await setOrder(cookies.get("userId"));
    setCartList([]);
    setSignIn(false)
  }
  /*
    renders the various forms and hoists the proper buttons in the correct locations
  */
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
              {toggleSignUp ? (   
              <p>First Name:
              <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
              required />
              </p>
              ):""}
              {toggleSignUp ? (   
              <p>Last Name:
              <input
              name="LastName"
              type="text"
              value={lastName}
              onChange={event => setLastName(event.target.value)}
              required />
              </p>
              ):""}

              <button className=" btn btn-success">Submit</button>
              </form>
                Toggle Sign In and Sign Up:
                <div onClick={toggleMode} style={{cursor : 'pointer', color: 'blue'}} >
                    {toggleSignUp ? 'Sign In' : 'Sign Up'}
                </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
