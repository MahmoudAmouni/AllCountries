/* eslint-disable react/prop-types */
function List({ countryData }) {
  return (
    <ul className="country-list">
      {countryData.map((country, index) => (
        <li key={index}>
          {/* Classes For style */}
          <div className="container">
            <div className="card">
              {/* Front : the flag and the name of the country */}
              <div className="front">
                <img
                  className="flag"
                  src={country.flags.png}
                  alt={`${country.name.common} Flag`}
                />
                <p>{country.name.common}</p>
              </div>

              {/* Back of the card all the data */}
              <div className="back">
                <p className="back-heading">{country.name.official}</p>
                <p>Continents: {country.continents}</p>
                <p>Capital: {country.capital}</p>
                <p>
                  Area: {country.area} km² / Timezones:
                  {country.timezones.length}
                </p>
                <p>Population:{country.population}</p>

                <p>
                  Languages:{" "}
                  {country.languages
                    ? Array.isArray(country.languages)
                      ? country.languages.map((language, i) => (
                          <span key={i}>
                            {language}
                            {i < country.languages.length - 1 && ", "}
                          </span>
                        ))
                      : Object.values(country.languages)[0] ||
                        "No specific language listed"
                    : "Loading languages..."}
                </p>

                <p>
                  Currencies:{" "}
                  {country.currencies
                    ? typeof country.currencies === "object"
                      ? Object.entries(country.currencies).map(
                          ([currencyCode, currencyData], i) => (
                            <span key={i}>
                              {currencyData.name} ({currencyData.symbol}){" "}
                              {currencyCode}
                              {i < Object.keys(country.currencies).length - 1 &&
                                ", "}
                            </span>
                          )
                        )
                      : "No currency information available" // Handle empty object
                    : "Loading currencies..."}
                </p>

                <a href={country.maps.googleMaps}>Google Maps</a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default List;
