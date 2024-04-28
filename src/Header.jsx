/* eslint-disable react/prop-types */
function Header({ children, countriesNumber }) {
  return (
    <header>
      {/* Logo */}
      <div className="logo">
        <h1>World Countries</h1>
      </div>

      {/* Search Bar */}
      {children}

      {/* Country Count */}
      <div className="country-count">Total countries:{countriesNumber}</div>
    </header>
  );
}

export default Header;
