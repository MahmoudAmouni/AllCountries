/* eslint-disable react/prop-types */
function SearchFilter({ setFilterOption, setQuery }) {
  return (
    // Search bar here
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search countries..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/* Filter here */}
      <div className="filter">
        <select onChange={(e) => setFilterOption(e.target.value)}>
          <option value="">Select Filter</option>
          <option value="Area">Area</option>
          <option value="Population">Population</option>
          <option value="TimeZones">TimeZones</option>
          <option value="AlphaBits">AlphaBits</option>
        </select>
      </div>
    </div>
  );
}

export default SearchFilter;
