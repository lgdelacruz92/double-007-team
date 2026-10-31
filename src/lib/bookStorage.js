import { starterBooks } from '../data/books';

export const storageKey = 'little-library-books';

function isValidBook(book) {
  return (
    book !== null &&
    typeof book === 'object' &&
    typeof book.id === 'string' &&
    typeof book.title === 'string' &&
    typeof book.author === 'string' &&
    typeof book.isRead === 'boolean'
  );
}

export function loadBooks() {
  try {
    const savedBooks = localStorage.getItem(storageKey);

    if (savedBooks === null) {
      return starterBooks;
    }

    const books = JSON.parse(savedBooks);

    if (Array.isArray(books) && books.every(isValidBook)) {
      return books;
    }
  } catch {
    // A blocked browser store or invalid JSON should not prevent using the app.
  }

  return starterBooks;
}

export function saveBooks(books) {
  localStorage.setItem(storageKey, JSON.stringify(books));
}
