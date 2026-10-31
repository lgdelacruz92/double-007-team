import { useEffect, useState } from 'react';
import AddBookForm from './components/AddBookForm';
import BookCard from './components/BookCard';
import BookFilters from './components/BookFilters';
import { loadBooks, saveBooks } from './lib/bookStorage';

export default function App() {
  const [books, setBooks] = useState(loadBooks);
  const [activeFilter, setActiveFilter] = useState('all');
  const [storageError, setStorageError] = useState('');
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    try {
      saveBooks(books);
      setStorageError('');
    } catch {
      setStorageError('Your browser cannot save this shelf. Changes will be lost when you leave.');
    }
  }, [books]);

  function addBook(title, author) {
    const newBook = {
      id: crypto.randomUUID(),
      title: title,
      author: author,
      isRead: false,
    };

    setBooks((currentBooks) => [newBook, ...currentBooks]);
    setActiveFilter('all');
    setAnnouncement(`Added ${title} to your shelf.`);
  }

  function toggleRead(bookId) {
    setBooks((currentBooks) => currentBooks.map((book) => {
      if (book.id === bookId) {
        return { ...book, isRead: !book.isRead };
      }

      return book;
    }));
  }

  function removeBook(bookId) {
    setBooks((currentBooks) => currentBooks.filter((book) => book.id !== bookId));
    setAnnouncement('Book removed from your shelf.');
  }

  const finishedCount = books.filter((book) => book.isRead).length;
  const unreadCount = books.length - finishedCount;
  const visibleBooks = books.filter((book) => {
    if (activeFilter === 'read') return book.isRead;
    if (activeFilter === 'unread') return !book.isRead;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="flex items-center gap-3 border-b border-stone-200 pb-6">
        <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-800 text-xl text-white">L</span>
        <span className="text-lg font-semibold tracking-tight">Little Library</span>
      </header>

      <main>
        <section className="py-10 sm:py-14" aria-labelledby="page-heading">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-800">ONE GOOD BOOK AT A TIME</p>
          <h1 id="page-heading" className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">A little space for big stories.</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-600">Keep your next reads close, celebrate the ones you finish, and make room for something new.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
            <p><strong className="text-stone-800">{books.length}</strong> on your shelf</p>
            <p><strong className="text-stone-800">{unreadCount}</strong> to read</p>
            <p><strong className="text-stone-800">{finishedCount}</strong> finished</p>
          </div>
        </section>

        {storageError && <p role="alert" className="mb-6 rounded-lg bg-amber-100 p-4 text-sm text-amber-900">{storageError}</p>}
        <p role="status" className="sr-only">{announcement}</p>

        <div className="grid items-start gap-8 lg:grid-cols-[340px_1fr]">
          <AddBookForm onAddBook={addBook} />

          <section aria-labelledby="shelf-heading">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <h2 id="shelf-heading" className="text-xl font-semibold">Your shelf</h2>
              <BookFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>

            {visibleBooks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-stone-300 px-6 py-12 text-center">
                <h3 className="font-medium">A little room for a new story.</h3>
                <p className="mt-2 text-sm text-stone-600">No books in this view yet. Add a book or try another filter.</p>
              </div>
            ) : (
              <ul className="space-y-4" aria-label="Books on your shelf">
                {visibleBooks.map((book) => (
                  <BookCard key={book.id} book={book} onToggleRead={toggleRead} onRemove={removeBook} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      <footer className="mt-12 border-t border-stone-200 pt-6 text-sm text-stone-500">Just you and your books. Your shelf stays in this browser; no account needed.</footer>
    </div>
  );
}
