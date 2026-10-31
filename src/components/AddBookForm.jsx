import { useState } from 'react';

export default function AddBookForm({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();

    if (!trimmedTitle || !trimmedAuthor) {
      setError('Please enter a title and an author.');
      return;
    }

    onAddBook(trimmedTitle, trimmedAuthor);
    setTitle('');
    setAuthor('');
    setError('');
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8" aria-labelledby="add-book-heading">
      <h2 id="add-book-heading" className="text-xl font-semibold">Found your next read?</h2>
      <p className="mt-2 text-sm text-stone-600">Give it a spot on your shelf.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="book-title" className="mb-2 block text-sm font-medium">Book title</label>
          <input
            id="book-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. The Secret Garden"
            required
            maxLength={160}
            className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 placeholder:text-stone-500"
          />
        </div>
        <div>
          <label htmlFor="book-author" className="mb-2 block text-sm font-medium">Author</label>
          <input
            id="book-author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="e.g. Frances Hodgson Burnett"
            required
            maxLength={160}
            className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 placeholder:text-stone-500"
          />
        </div>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button type="submit" className="w-full rounded-lg bg-teal-800 px-4 py-3 font-medium text-white transition-colors hover:bg-teal-900">
          Add to my shelf
        </button>
      </form>
    </section>
  );
}
