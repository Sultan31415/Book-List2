import React, { useEffect, useState } from 'react';
import './DailyNews.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://139.59.154.175:8000';

interface BookDiscovery {
  title: string;
  author: string;
  description: string;
  image_url: string;
  category: string;
}

const DailyNews: React.FC = () => {
  const [books, setBooks] = useState<BookDiscovery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/daily-discoveries`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch discoveries');
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="daily-news">
      <div className="daily-news__header">
        <h2>Daily Book Discoveries</h2>
        <p>Explore today's featured books from Google Books</p>
      </div>
      <div className="daily-news__grid">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && books.length === 0 && <p>No discoveries found.</p>}
        {books.map((book, idx) => (
          <div className="book-card" key={idx}>
            {book.image_url ? (
              <img className="book-card__image" src={book.image_url} alt={book.title} />
            ) : (
              <div className="book-card__image-placeholder">
                <span>No Cover</span>
              </div>
            )}
            <div className="book-card__content">
              <h3>{book.title}</h3>
              <p className="book-card__author">{book.author}</p>
              <p className="book-card__description">{book.description}</p>
              <span className="book-card__category">{book.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyNews; 