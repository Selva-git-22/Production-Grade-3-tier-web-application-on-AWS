import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="hero">
        <h1>Welcome to ShopEasy</h1>
        <p>Best deals on electronics & gadgets</p>
        <button onClick={() => navigate("/login")} className="btn">
          Shop Now
        </button>
      </div>
    </>
  );
}

export default Home;
