import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './HistoryPage.css';

function HistoryPage() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const newsCollectionRef = collection(db, "news");
            const data = await getDocs(newsCollectionRef);
            setNews(data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                datetime: doc.data().datetime ? new Date(doc.data().datetime.seconds * 1000).toLocaleString() : "Not provided"
            })));
        };

        fetchNews();
    }, []);

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">News History</h2>
                    <div className="scroll-container">
                        {news.length > 0 ? (
                            <ul className="list-group">
                                {news.map((item) => (
                                    <li key={item.id} className="list-group-item">
                                        <h5 className="mb-1">{item.title}</h5>
                                        <p className="mb-1">
                                            <strong>Location:</strong> {item.location}
                                        </p>
                                        <p className="mb-1">
                                            {item.body}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Date and Time:</strong> {item.datetime}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Crop Type:</strong> {item.cropType}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center">No news found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HistoryPage;
