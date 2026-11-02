
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please enter username and password");
      return;
    }

    try {
      const res = await axios.post(
        "https://bus-booking-django.onrender.com/api/token/",
        {
          username: username,
          password: password
        }
      );

      sessionStorage.setItem("access", res.data.access);
      sessionStorage.setItem("refresh", res.data.refresh);

      alert("Login successful!");

      // Return to confirmation if redirected from booking
      const previousPage = location.state?.from || "/";

      navigate(previousPage, {
        state: location.state?.booking
          ? location.state.booking
          : undefined
      });

    } catch (err) {
      console.log(err.response?.data || err.message);
      setMessage("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-400 p-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          🚌 BusGo
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue your journey
        </p>

        <form onSubmit={handleLogin}>

          <div className="mb-5">
            <label className="block font-semibold mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {message && (
            <p className="text-red-600 text-center mb-4">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Welcome to BusGo! Book your tickets easily.
        </p>

      </div>
    </div>
  );
}

export default Login;
