import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2>ShopEasy</h2>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
}

export default Navbar
