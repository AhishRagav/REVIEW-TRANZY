import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [average, setAverage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAverage();
  }, []);

  const fetchAverage = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getavg');
      setAverage(response.data);
    } 
    catch (err) {
      console.error('Error fetching average:', err);
    }
  };

  const handleSubmit = async () => {
    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      setError('Rating must be a number between 0 and 5 .');
      return;
    }

    setError('');
    try {
      await axios.post('http://localhost:8080/postreview', {
        review: parsedRating,
        comment,
      });

      setRating('');
      setComment('');
      fetchAverage();
    }
    
    catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div className="main-container">
      <h1 className="heading">We at TRANZY welcome your reviews!</h1>
      <div className="box-container">
        <div className="box form-box">
          <h2>Submit Your Review</h2>

          <label>
            Rating (0.0 - 5.0):
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>

          <label>
            Optional Comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>


          <button onClick={handleSubmit}>Submit Review</button>

          {error && <p className="error">{error}</p>}

        </div>

        <div className="box average-box">
          <h2>CURRENT AVERAGE RATING</h2>
          <p className="average-rating">
            {average !== null ? average.toFixed(1) : 'Loading...'}
          </p>
          <p className="thank-you">
            Thank you for choosing TRANZY!<br />
            Your feedback helps us maintain our high standards and continue providing excellent service to all our customers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
