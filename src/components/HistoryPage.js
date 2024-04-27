import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import './HistoryPage.css';

function HistoryPage() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const historyCollectionRef = collection(db, "history"); // Adjust "history" to your specific collection
            const data = await getDocs(historyCollectionRef);
            setHistory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        fetchHistory();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>History</h1>
            <div>
                {history.length > 0 ? (
                    history.map((entry) => (
                        <div key={entry.id} style={{ margin: '10px', padding: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                            <h2>{entry.title}</h2>
                            <p>{entry.description}</p>
                            <p>Date: {entry.date}</p>
                        </div>
                    ))
                ) : (
                    <p>No history entries found.</p>
                )}
            </div>
        </div>
    );
}

export default HistoryPage;
