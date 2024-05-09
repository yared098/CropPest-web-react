import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
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
        <div className="history-page">
            <div className="scroll-container">
                {news.length > 0 ? (
                    <List>
                        {news.map((item) => (
                            <ListItem key={item.id} divider>
                                <ListItemText
                                    primary={item.title}
                                    secondary={
                                        <>
                                            <Typography component="span" color="text.primary">
                                                Location: {item.location}
                                            </Typography>
                                            {' — '}
                                            {item.body}
                                            {' — '} 
                                            Date and Time: {item.datetime}
                                            {' — '}
                                            Crop Type: {item.cropType}
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography className="no-news">No news found.</Typography>
                )}
            </div>
        </div>
    );
}

export default HistoryPage;
