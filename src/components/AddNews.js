import React, { useState } from 'react';
import { db } from '../firebase-config'; // Import Firestore configuration
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CircularProgress } from '@mui/material'; // Import CircularProgress
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './AddNews.css'; // Ensure the CSS is properly linked

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
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="add-news-form">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title of the news</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title of the news"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="body" className="form-label">Body of the news</label>
              <textarea
                className="form-control"
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Body of the news"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date of the news</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">Time of the news</label>
              <input
                type="time"
                className="form-control"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location of the news</label>
              <input
                type="text"
                className="form-control"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location of the news"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="officerId" className="form-label">Officer ID</label>
              <input
                type="text"
                className="form-control"
                id="officerId"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                placeholder="Officer ID"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : "Submit News"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNews;
