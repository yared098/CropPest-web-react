import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';  // Make sure to import Firestore
import { collection, addDoc } from 'firebase/firestore';
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Save additional user data in Firestore after successful signup
      await addDoc(collection(db, "officer"), {
        uid: userCredential.user.uid,  // Reference UID from created user
        name: name,
        email: email,  // Optional: Store email again for easy access
        phone: phone,
        location: location
      });
      navigate('/home');  // Redirect to the home page after successful sign up
      alert("Account created successfully!");
    } catch (error) {
      alert("Failed to create account: " + error.message);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSignUp} className="sign-up-form">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
