import {CartIcon} from '../assets/CartIcon'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies();



// Bootstrap Template for header bar adapted from Bootstrap Docs example at:
// https://getbootstrap.com/docs/5.1/components/navbar/


/*
  The navigation bar present in the main shopping page, lets user hit the sign in button
  and allows users access to the search input to search fro specific item cards
*/
const Navbar = ({ setToggleCart, toggleCart, setItemsList, setSignIn}) => {

  /*
    posts a query string to the shopping route, returns the items with this
    search string present in their item tags
  */
  const postItems = async (queryString) => {
    let url = "http://localhost:3005/shopping"
    let payload = {queryString : queryString}
    let res = await axios.post(url, payload);
    let data = res.data;
    console.log(res)
    console.log(data)
    setItemsList(data);
  }
  // when the search button is hit, get the query string and post it.
  const handleSearchSubmit = (event) =>
  {
    event.preventDefault();
    var queryString = document.getElementById("searchBar").value;
    postItems(queryString);
  }
  // navigate to the sign in page
  const handleSignIn = (event) => {
    //cookies.set('userId', 1, {sameSite: 'lax'});
    setSignIn(true);
    //console.log(cookies.get("userId"));
  }
  // remove user from cookies
  const handleSignOut = (event) => {
    cookies.set('userId', null, {sameSite: 'lax'});
    console.log("")
  }
  // renders the navbar, many parts adapted from the above bootstrap websites template (linked above)
  // renders the current user name in cookies, the search inputs, and other important navbar html components
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Dan's 3D Printed Minatures</a>
          <form className="d-flex" onSubmit={handleSearchSubmit} >
            <input
              id="searchBar"
              className="form-control me-2"
              type="search"
              placeholder="Tags: Elves, Sci-Fi, Etc"
              aria-label="Search"
            ></input>
            <button className="btn btn-info" type="submit">
              Search Tags
            </button>
          </form>
            {cookies.get("userId") && cookies.get("userId") != 'null' ? <p>Not {cookies.get("userName")}?</p>: ""}
          <button className="btn btn-info" onClick={handleSignIn}>
            {cookies.get("userId") && cookies.get("userId") != 'null' ? <p>Change User</p>: <p>Sign In</p>}
            </button>
            <div id='cartHolder'>          
            <CartIcon 
            setToggleCart={setToggleCart}
            toggleCart={toggleCart}
            />
            </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
