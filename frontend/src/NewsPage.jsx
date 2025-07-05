import React, { useState, useEffect } from "react";
import axios from "axios";
import './NewsPage.css';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "42ca70936dfe4f8ab3b01598a47c68fe";
  const endpoint = `https://newsapi.org/v2/everything?q=sports&apiKey=${apiKey}`;

  const fetchNews = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(endpoint);
      setNews(response.data.articles);
    } catch (err) {
      setError("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const saveArticle = (article) => {
    const savedArticles = JSON.parse(localStorage.getItem("savedNews")) || [];
    if (!savedArticles.some((a) => a.url === article.url)) {
      savedArticles.push(article);
      localStorage.setItem("savedNews", JSON.stringify(savedArticles));
    }
  };

  return (
    <section className="news-section" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Latest News</h1>
      
      <p>
        Stay updated with the most recent news across sectors and markets. Our curated news feed brings you the latest headlines, insights, and trends.
      </p>

      {loading && <p>Loading news...</p>}
      {error && <p>{error}</p>}

      <div style={{marginTop: "20px", maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
        {news.length > 0 ? (
          news.slice(0, 15).map((article, index) => (
            <div
              key={index}
              style={{
                backgroundColor:"lightcyan",
                border: "1px solid #ddd",
                borderRadius: "13px",
                padding: "25px",
                marginBottom: "15px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <h3 style={{ color:"darkblue",margin: "0 0 10px" }}>{article.title}</h3>
              <p>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", paddingTop:"20px",color: "#4361ee", textDecoration: "none", marginRight: "10px" }}
              >
                Read more
              </a>
              <button 
                onClick={() => saveArticle(article)} 
                style={{ padding: "5px 10px" , color:"white",backgroundColor:"green"}}
                className="save-btn"
              >
                Save
              </button>
            </div>
          ))
        ) : (
          !loading && <p>No news available</p>
        )}
      </div>
      
      <div style={{ marginTop: "20px" }}>
        <button 
          className="btn btn-primary" 
          onClick={fetchNews}
          style={{ padding: "8px 16px", backgroundColor: "#4361ee", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Refresh News
        </button>
      </div>
    </section>
  );
};

export default NewsPage;
