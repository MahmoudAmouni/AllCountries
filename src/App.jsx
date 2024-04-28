import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import SearchFilter from "./SearchFilter";
import List from "./List";
import Quiz from "./Quiz/Quiz";
import Loader from "./Quiz/Loader";
import Button from "./Button";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [countriesNumber, setCountriesNumber] = useState();
  const [quiz, setQuiz] = useState(false);

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
    let filteredCountries = countryData.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );

    // Apply sorting based on filterOption
    switch (filterOption) {
      case "Area":
        filteredCountries.sort((a, b) => a.area - b.area);
        break;
      case "Population":
        filteredCountries.sort((a, b) => a.population - b.population);
        break;
      case "TimeZones":
        filteredCountries.sort(
          (a, b) => b.timezones.length - a.timezones.length
        );
        break;
      case "AlphaBits":
        filteredCountries.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        break;
      default:
        // Default is to sort alphabetically by name
        filteredCountries.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        break;
    }

    // Update the state with the sorted and filtered list of countries
    setFilteredCountries(filteredCountries);
    setCountriesNumber(filteredCountries.length);
  }, [countryData, query, filterOption]);

  return (
    <>
      {!quiz && (
        <>
          <Header countriesNumber={countriesNumber}>
            <SearchFilter
              setFilterOption={setFilterOption}
              setQuery={setQuery}
            />
          </Header>
          <Button className="stick" onClick={() => setQuiz(true)}>
            Countries Quiz
          </Button>

          {isError ? (
            <p>Error fetching countries. Please try again later.</p>
          ) : countryData.length === 0 ? (
            <Loader>Countries</Loader>
          ) : (
            <List countryData={filteredCountries} />
          )}
        </>
      )}
      {quiz && <Quiz setQuiz={setQuiz} />}
    </>
  );
}

export default App;
