import './stats.css';

export default function Stats({ totalBooks, averageYear, booksWithFullText }) {

  return (
    <div className="stats">
      <div className="stat-box">
        <span className="stat-label">Total Books Found</span>
        <span>{totalBooks}</span>
      </div>
      <div className="stat-box">
        <span className="stat-label">Books with Full Text Available</span>
        <span>{booksWithFullText}</span>
      </div>
      <div className="stat-box">
        <span className="stat-label">Average First Publish Year</span>
        <span>{averageYear}</span>
      </div>
    </div>
  );
}
