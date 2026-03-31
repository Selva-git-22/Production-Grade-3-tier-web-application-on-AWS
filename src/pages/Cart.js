import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://10.0.19.157/api/cart")
      .then(res => res.json())
      .then(setCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Cart</h2>

        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt="" />
            <div>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))}

        <h3>Total: ₹{total}</h3>
      </div>
    </>
  );
}

export default Cart;
