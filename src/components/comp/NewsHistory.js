import React from 'react';
import './NewsHistory.css';  // Specific styling for News History

const NewsHistory1 = () => {
    const news = [
        { title: "Crop Prices Rising", date: "2024-04-25" },
        { title: "New Farming Techniques", date: "2024-04-20" }
    ];

    return (
        <div className="news-history">
            <h2>News History</h2>
            {news.map((item, index) => (
                <p key={index}>{item.title} - {item.date}</p>
            ))}
        </div>
    );
};

export default NewsHistory1;
