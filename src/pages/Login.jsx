import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setIsAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://backendwnr2-1.onrender.com/api/auth/login", { email, password });
      // stocker token ou flag admin
      localStorage.setItem("adminToken", "loggedIn"); // peut être token réel plus tard
      setIsAdmin(true); // update état admin
      navigate("/dashboard"); // redirige vers dashboard
    } catch (err) {
      setError("Email ou mot de passe incorrect");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
