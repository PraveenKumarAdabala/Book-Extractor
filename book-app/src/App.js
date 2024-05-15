import React, { useState, useEffect } from 'react';
import './App.scss'; // Importing the main SCSS file for styling
import BookTable from './BookTable'; // Importing the BookTable component
import { FOOTER_URL } from './constants'; // Importing the footer URL from constants

function App() {
  const [books, setBooks] = useState([]); // State to store the fetched books data
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'default' }); // State to manage table sorting
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    // Fetching data from the server on component mount
    fetch('/getextracts?titlecontains=s')
      .then(response => response.json())
      .then(data => {
        // Mapping the fetched data to required format and updating state
        const filteredBooks = data.Extracts.map(book => ({
          sequenceNumber: book.sequenceNumber,
          author: book.author,
          authorBiography: book.authorBiography,
          title: book.title,
          estimatedReadingTimeMinutes: book.estimatedReadingTimeMinutes,
          publicationDate: book.publicationDate,
          isbn: book.isbn,
          jacketUrl: book.jacketUrl
        }));
        setBooks(filteredBooks); // Updating books state
        setIsLoading(false); // Setting loading state to false
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to fetch data only once on component mount

  const sortTable = (key) => {
    // Function to handle table sorting based on the given key
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction }); // Updating sortConfig state
  };

  let sortedBooks = [];
  if (books.length > 0) {
    // Sorting books based on sortConfig if books array is not empty
    sortedBooks = [...books].sort((a, b) => {
      if (sortConfig.direction === 'ascending') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      if (sortConfig.direction === 'descending') {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Book Extracts from Pan Macmillan</h1>
      </header>
      <main>
        {books.length > 0 ? (
          <BookTable books={sortedBooks} sortTable={sortTable} /> // Rendering BookTable component with sortedBooks data
        ) : (
          <p>Loading...</p> // Rendering loading message when books data is being fetched
        )}
      </main>
      {!isLoading && (
        <footer>
          <p><a href={FOOTER_URL} target='_blank' rel="noreferrer">Praveen Kumar</a></p>
        </footer> // Rendering footer with link when data fetching is completed
      )}
    </div>
  );
}

export default App;
