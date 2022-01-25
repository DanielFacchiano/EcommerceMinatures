import {CartIcon} from '../assets/CartIcon'


// Bootstrap Template for header bar adapted from Bootstrap Docs example at:
// https://getbootstrap.com/docs/5.1/components/navbar/
const handleSearchSubmit = (event) =>
{
  event.preventDefault();
}

const Navbar = ({ setToggleCart, toggleCart}) => {
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
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
          <button className="btn btn-info" type="submit">
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
