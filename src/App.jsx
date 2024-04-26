import { useEffect, useState } from 'react';
import './App.css';
import App2 from './App2';

function App() {
  const [countryData, setCountryData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [countriesNumber, setCountriesNumber] = useState()
  const [quiz,setQuiz] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }
        const data = await res.json();

        if (Array.isArray(data)) {
          setCountryData(data);
        } else {
          console.error("Invalid data format:", data);
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    }

    fetchData();
  }, []);
  

  // Filtering and sorting based on filter option and query
  useEffect(() => {
    // Filter and sort the list of countries based on query and filterOption
    let filteredCountries = countryData.filter(country => 
      country.name.common.toLowerCase().includes(query.toLowerCase())

    );

    // Apply sorting based on filterOption
    switch (filterOption) {
      case 'Area':
        filteredCountries.sort((a, b) => a.area - b.area);
        break;
      case 'Population':
        filteredCountries.sort((a, b) => a.population - b.population);
        break;
      case 'TimeZones':
        filteredCountries.sort((a, b) => b.timezones.length - a.timezones.length);
        break;
      case 'AlphaBits':
        filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        break;
      default:
        // Default is to sort alphabetically by name
        filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        break;
    }

    // Update the state with the sorted and filtered list of countries
    setFilteredCountries(filteredCountries);
    setCountriesNumber(filteredCountries.length);
  }, [countryData, query, filterOption]);

  
   
  return (
    <>
      
{  !quiz && <>

      <Header 
      setQuery={setQuery} 
      query={query}
      setFilterOption={setFilterOption}
      countriesNumber={countriesNumber}
      />
      <button className='stick' onClick={()=>setQuiz(true)}>Countries Quiz</button>

      {isError ? (
        <p>Error fetching countries. Please try again later.</p>
      ) : countryData.length === 0 ? (
        <p>Loading countries...</p>
      ) : (
        <List countryData={filteredCountries} />
      )}
      </>
}
{quiz && <App2  setQuiz={setQuiz}/>}


    </>
  );

}







// eslint-disable-next-line react/prop-types
function List({countryData}){
  

  return (
    <ul className="country-list">
    {
    // eslint-disable-next-line react/prop-types
    countryData.map((country, index) => (
      
      
      <li key={index}>

<div className="container">
  <div className="card">
    <div className="front">
    <img className='flag' src={country.flags.png} alt={`${country.name.common} Flag`} />
      <p>{country.name.common}</p>
    </div>
    <div className="back">
      <p className="back-heading">{country.name.official}</p>
      <p>Continents: {country.continents}</p>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km² / Timezones:{country.timezones.length}</p>
      <p>Population:{country.population}</p>
      
      <p>
  Languages: {country.languages ? (
    Array.isArray(country.languages) ? ( 
      country.languages.map((language, i) => (
        <span key={i}>
          {language}
          {i < country.languages.length - 1 && ', '} 
        </span>
      ))
    ) : (
      Object.values(country.languages)[0] || 'No specific language listed' 
    )
  ) : (
    'Loading languages...' 
  )}
</p>
     <p>

Currencies: {country.currencies ? (
  typeof country.currencies === 'object' ? (
    Object.entries(country.currencies).map(([currencyCode, currencyData], i) => (  
      <span key={i}>
        {currencyData.name} ({currencyData.symbol})
        {i < Object.keys(country.currencies).length - 1 && ', '}  
        </span>
    ))
  ) : (
    'No currency information available'  // Handle empty object
  )
) : (
  'Loading currencies...'
)}   
</p>



<a href={country.maps.googleMaps} >Google Maps</a>


    </div>
  </div>
</div>

        
      </li>
    ))}
  </ul>
  )
}

// eslint-disable-next-line no-unused-vars, react/prop-types
function Header({query,setQuery,setFilterOption,countriesNumber}) {
  return (
    <header>
      {/* Logo */}
      <div className="logo">
        <h1>World Countries</h1>
      </div>

      {/* Search Bar */}
      <div className="search-container">
  <div className="search-bar">
    <input type="text" placeholder="Search countries..." onChange={(e) => setQuery(e.target.value)} />
    {/* Add search icon or button if necessary */}
  </div>
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

      {/* Country Count */}
      <div className="country-count">
        Total countries:{countriesNumber}
      </div>
    </header>
  );
}

export default App;
