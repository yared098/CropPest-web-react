import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
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
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Add Report</h1>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                />
                <button type="submit">Add Report</button>
            </form>
            <div>
    <h2>All Reports</h2>
    <div className="report-container">
        {reports.map(report => (
            <div className="report-card" key={report.id}>
                <div className="report-field">
                    <strong>Title:</strong> <span>{report.title}</span>
                </div>
                <div className="report-field">
                    <strong>Description:</strong> <span>{report.description}</span>
                </div>
                <div className="report-field">
                    <strong>Date:</strong> <span>{report.dateTime?.toLocaleString()}</span>
                </div>
            </div>
        ))}
    </div>
</div>

        </div>
    );
};

export default AddReportForm;
