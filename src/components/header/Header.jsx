import YearFilter from '../filter/YearFilter';
import './Header.css';

export default function Header({ query, handleSearchChange, onFilterChange, setStartSearch }) {
  return (
    <header className="header">
      <h1>Open Library Book Search</h1>
      <input
        type="text"
        placeholder="Search for books by title..."
        value={query}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <button onClick={() => query ? setStartSearch(true): {}}>Search</button>
      <YearFilter onFilterChange={onFilterChange} /> {/* Add the FilterDropdown here */}
      
    </header>
  );
}
