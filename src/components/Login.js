import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config';
import { useNavigate, Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Login.css';  

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');  // Redirect to the home page after successful login
    } catch (error) {
      alert("Failed to log in: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Create new account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
