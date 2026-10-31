export default function BookCard({ book, onToggleRead, onRemove }) {
  const statusStyle = book.isRead
    ? 'bg-teal-50 text-teal-800'
    : 'bg-amber-50 text-amber-900';

  return (
    <li className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words text-lg font-semibold">{book.title}</h3>
          <p className="mt-1 break-words text-sm text-stone-600">{book.author}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyle}`}>
          {book.isRead ? 'Finished' : 'To read'}
        </span>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
        <button
          type="button"
          onClick={() => onToggleRead(book.id)}
          aria-label={`${book.isRead ? 'Mark unread' : 'Mark as read'}: ${book.title}`}
          className="rounded px-1 py-2 text-sm font-medium text-teal-800 hover:underline"
        >
          {book.isRead ? 'Mark unread' : 'Mark as read'}
        </button>
        <button
          type="button"
          onClick={() => onRemove(book.id)}
          aria-label={`Remove ${book.title}`}
          className="rounded px-1 py-2 text-sm text-stone-600 hover:text-red-700 hover:underline"
        >
          Remove
        </button>
      </div>
    </li>
  );
}
