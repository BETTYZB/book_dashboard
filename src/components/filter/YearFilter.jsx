export default function YearFilter({ onFilterChange }){
  return (
    <div style={{  position: 'relative'}}>
      <label>Filter by Year Range: </label>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All Years</option>
        <option value="1900-2000">1900-2000</option>
        <option value="2000-2020">2000-2020</option>
        <option value="2020-2025">2020-2025</option>
      </select>
    </div>
  );
};

