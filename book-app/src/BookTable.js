// BookTable.js

import React from 'react';
import { ISBN_URL } from './constants'; // Importing the ISBN_URL from constants for book links

// BookTable component function taking props: books array and sortTable function
const BookTable = ({ books, sortTable }) => {
  return (
    <table>
      <thead>
        <tr>
          {/* Table headers with onClick event handlers for sorting */}
          <th>#</th>
          <th>Cover</th>
          <th onClick={() => sortTable('author')}>Author</th>
          <th>Biography</th>
          <th onClick={() => sortTable('title')}>Title</th>
          <th onClick={() => sortTable('estimatedReadingTimeMinutes')}>Reading Time (minutes)</th>
          <th onClick={() => sortTable('publicationDate')}>Publication Date</th>
        </tr>
      </thead>
      <tbody>
        {/* Mapping over books array to render table rows */}
        {books.map((book, index) => (
          <tr key={book.isbn}> {/* Using ISBN as key for each book */}
            <td>{index + 1}</td> {/* Displaying serial number */}
            {/* Linking book cover to ISBN_URL */}
            <td><a href={`${ISBN_URL}${book.isbn}`} target="_blank" rel="noopener noreferrer"><img src={book.jacketUrl} alt='book'></img></a></td>
            <td>{book.author}</td> {/* Displaying author name */}
            <td dangerouslySetInnerHTML={{ __html: book.authorBiography }}></td> {/* Displaying author biography with HTML */}
            {/* Linking book title to ISBN_URL */}
            <td><a href={`${ISBN_URL}${book.isbn}`} target="_blank" rel="noopener noreferrer">{book.title}</a></td>
            <td>{book.estimatedReadingTimeMinutes}</td> {/* Displaying estimated reading time */}
            <td>{new Date(book.publicationDate).toLocaleDateString('en-US')}</td> {/* Formatting publication date */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookTable; // Exporting the BookTable component
