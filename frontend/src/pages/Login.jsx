import { useState } from "react";
import API from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      if (res.data.role === "ADMIN") {
        window.location.href = "/admin";
      }

      if (res.data.role === "USER") {
        window.location.href = "/user";
      }

      if (res.data.role === "OWNER") {
        window.location.href = "/owner";
      }

    } catch (error) {

      alert("Login Failed");

    }

  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Store Rating System</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;