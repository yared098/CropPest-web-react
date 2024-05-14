import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddReportForm.css';

const AddReportForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [reports, setReports] = useState([]);

    const reportsCollectionRef = collection(db, "reports");

    useEffect(() => {
        const fetchReports = async () => {
            const data = await getDocs(reportsCollectionRef);
            setReports(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchReports();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newDoc = await addDoc(reportsCollectionRef, {
                title: title,
                description: description,
                dateTime: new Date(dateTime), // Convert the dateTime string to a Date object
                createdAt: new Date()
            });
            setReports(prev => [...prev, { ...newDoc.data(), id: newDoc.id }]);
            alert("Report added successfully!");
            setTitle("");
            setDescription("");
            setDateTime("");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <h1 className="card-title">Add Report</h1>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dateTime" className="form-label">Date and Time</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="dateTime"
                                value={dateTime}
                                onChange={(e) => setDateTime(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Report</button>
                    </form>
                </div>
            </div>
            <div className="mt-5">
                <h2>All Reports</h2>
                <div className="row overflow-auto" style={{ maxHeight: '400px' }}>
                    {reports.map(report => (
                        <div className="col-md-4 mb-3" key={report.id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title"><strong>Title:</strong> {report.title}</div>
                                    <div className="card-text"><strong>Description:</strong> {report.description}</div>
                                    <div className="card-text"><strong>Date:</strong> {new Date(report.dateTime?.toDate()).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddReportForm;
