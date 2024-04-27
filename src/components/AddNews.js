import React, { useState } from 'react';
import { db } from '../firebase-config'; // Import Firestore configuration
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CircularProgress } from '@mui/material'; // Import CircularProgress
import './AddNews.css';  // Ensure the CSS is properly linked

function AddNews() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [officerId, setOfficerId] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to handle loading

  const navigate = useNavigate(); // Create navigate function instance

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      await addDoc(collection(db, "news"), {
        title: title,
        body: body,
        date: date,
        time: time,
        location: location,
        officerId: officerId,
        timestamp: new Date()
      });
      alert('News successfully added!');
      // Reset form fields
      setTitle('');
      setBody('');
      setDate('');
      setTime('');
      setLocation('');
      setOfficerId('');
      navigate('/home'); // Navigate back to the homepage
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Failed to add news');
    }
    setIsLoading(false); // End loading
  };

  return (
    <form onSubmit={handleSubmit} className="add-news-form">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title of the news" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body of the news" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date of the news" />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time of the news" />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location of the news" />
      <input type="text" value={officerId} onChange={(e) => setOfficerId(e.target.value)} placeholder="Officer ID" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : "Submit News"}
      </button>
    </form>
  );
}

export default AddNews;
