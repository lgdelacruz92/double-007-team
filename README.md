# Little Library

A simple React reading list styled with Tailwind CSS. Add a book, mark it as
finished, filter your shelf, or remove it. Books are saved in this browser's
local storage. No account, API, or backend is required.

## Run locally

Install Node.js 22.12 or newer, then run:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```sh
npm run build
npm run preview
```

## Browser tests

```sh
npx playwright install chromium
npm test
```

Playwright starts the development server automatically. Tests cover filtering,
adding, marking books read and unread, removing books, reload persistence,
validation, empty states, unavailable storage, invalid saved data, and a mobile viewport.
On supported Linux systems, use `npx playwright install --with-deps chromium`
if browser system dependencies are missing.

## Code map

- `src/App.jsx` — shelf state, book actions, and the page layout.
- `src/components/AddBookForm.jsx` — labeled inputs and simple validation.
- `src/components/BookCard.jsx` — one book and its actions.
- `src/components/BookFilters.jsx` — the three shelf filters.
- `src/lib/bookStorage.js` — loading, validating, and saving browser data.
- `src/data/books.js` — the three example books shown on first use.
- `src/styles.css` — Tailwind import and shared focus styles.
- `tests/library.spec.js` — readable end-to-end tests.

The code uses named functions, ordinary React state, and straightforward array
operations. There is no state-management library or custom abstraction layer.
React and React DOM render the app; Vite builds it; Tailwind handles styling;
Playwright tests browser behavior.

## Storage notes

An empty saved shelf stays empty. Invalid saved data falls back to the example
books. If the browser refuses to save, the app still works but displays a warning.
Clearing browser storage resets the shelf. Books are not synced between devices
or browser profiles.
