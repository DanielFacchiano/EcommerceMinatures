import {CartIcon} from '../assets/CartIcon'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies();



// Bootstrap Template for header bar adapted from Bootstrap Docs example at:
// https://getbootstrap.com/docs/5.1/components/navbar/



const Navbar = ({ setToggleCart, toggleCart, setItemsList}) => {

  const postItems = async (queryString) => {
    let url = "http://localhost:3005/shopping"
    let payload = {queryString : queryString}
    let res = await axios.post(url, payload);
    let data = res.data;
    console.log(res)
    console.log(data)
    setItemsList(data);
  }

  const handleSearchSubmit = (event) =>
  {
    event.preventDefault();
    var queryString = document.getElementById("searchBar").value;
    postItems(queryString);
  }

  const handleSignIn = (event) => {
    cookies.set('userId', 1, {sameSite: 'lax'});
    console.log(cookies.get("userId"));
  }

  const handleSignOut = (event) => {
    cookies.set('userId', null, {sameSite: 'lax'});
    console.log("")
  }

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
          <button className="btn btn-info" onClick={handleSignIn}>
              Sign In
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
