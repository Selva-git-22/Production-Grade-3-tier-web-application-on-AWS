import { useState } from "react";
import { signupUser } from "../services/api";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await signupUser(email, password);
    alert("Account created!");
    window.location.href = "/login";
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignup} className="btn">Signup</button>
    </div>
  );
}

export default Signup;
