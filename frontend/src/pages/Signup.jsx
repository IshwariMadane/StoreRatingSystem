import { useState } from "react";
import API from "../services/api";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSignup = async () => {

    try {

      await API.post("/auth/signup", {
        name,
        email,
        password,
        address,
        role: "USER"
      });

      alert("Signup Successful");
      window.location.href = "/";

    } catch (error) {

      alert("Signup Failed");

    }

  };

  return (
    <div className="container mt-5">

      <h1>Signup</h1>

      <input
        className="form-control mb-3"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={handleSignup}
      >
        Signup
      </button>

    </div>
  );

}

export default Signup;