import { useState, useEffect } from 'react';
import BookList from './components/bookList/BookList';
import Header from './components/header/Header';
import Stats from './components/stats/Stats'
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // State to store filtered books
  const [loading, setLoading] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);
  const [averageYear, setAverageYear] = useState(0);
  const [selectedYearRange, setSelectedYearRange] = useState(''); // Track selected year range
  const [startSearch, setStartSearch] = useState(false);
  const [booksWithFullText, setBooksWithFullText] = useState(0);

  useEffect(() => {
    if (startSearch){
      setStartSearch(false)
      setLoading(true);
      const fetchBooks = async () => {
        if (!query) {
          setBooks([]);
          setTotalBooks(0);
          setAverageYear(0);
          return;
        }

        const res = await fetch(`https://openlibrary.org/search.json?title=${query}`);
        const data = await res.json();
        const bookData = data.docs
        setBooks(bookData);
        setTotalBooks(data.numFound);

        // Calculate average year for first publish year
        const yearSum = bookData.reduce((sum, book) => sum + (book.first_publish_year || 0), 0);
        const avgYear = yearSum / bookData.length;
        setAverageYear(avgYear.toFixed(0));
        const fullTextCount = bookData.filter(book => book.has_fulltext).length;
        setBooksWithFullText(fullTextCount);
        setLoading(false);
      };

      fetchBooks();
    }
  }, [startSearch]);

  useEffect(() => {
    const filterBooksByYear = () => {
      if (selectedYearRange) {
        const [startYear, endYear] = selectedYearRange.split('-').map(Number);
        const filtered = books.filter(
          (book) =>
            book.first_publish_year >= startYear &&
            book.first_publish_year <= endYear
        );
        setFilteredBooks(filtered);
      } else {
        setFilteredBooks(books); // No filter applied, show all books
      }
    };

    filterBooksByYear();
  }, [selectedYearRange, books]); // Re-filter whenever year range or books change

  useEffect(() => {
    // Update stats when filteredBooks changes
    const updateStats = () => {
      const filteredBooksCount = filteredBooks.length;
      const filteredYearSum = filteredBooks.reduce((sum, book) => sum + (book.first_publish_year || 0), 0);
      const avgYearFiltered = filteredBooksCount > 0 ? (filteredYearSum / filteredBooksCount).toFixed(0) : 0;
      const fullTextFilteredCount = filteredBooks.filter(book => book.has_fulltext).length;

      setTotalBooks(filteredBooksCount);
      setAverageYear(avgYearFiltered);
      setBooksWithFullText(fullTextFilteredCount);
    };

    updateStats();
  }, [filteredBooks]); // Recalculate stats whenever filteredBooks change

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleYearFilterChange = (yearRange) => {
    setSelectedYearRange(yearRange); // Update the selected year range in App
  };

  return (
    <div className="app">
      <Header query={query} handleSearchChange={handleSearchChange} onFilterChange={handleYearFilterChange} setStartSearch={setStartSearch}/>
      <div className='content'>
        <Stats totalBooks={totalBooks} averageYear={averageYear} booksWithFullText={booksWithFullText}/>
        <BookList books={filteredBooks} loading={loading}/>
      </div>
    </div>
  );
}

export default App;
