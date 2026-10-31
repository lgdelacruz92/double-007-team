const filters = [
  { value: 'all', label: 'All books' },
  { value: 'unread', label: 'To read' },
  { value: 'read', label: 'Finished' },
];

export default function BookFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter books">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        const buttonStyle = isActive
          ? 'bg-teal-800 text-white'
          : 'bg-white text-stone-600 hover:bg-stone-200';

        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(filter.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${buttonStyle}`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
