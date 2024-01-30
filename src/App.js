import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import Countries from "./components/countries/countries";
import CountryInfo from "./components/countriesInformation/countriesInformation";
import Header from "./components/Header/Header";
import LeftBar from "./components/leftBar/LeftBar";
import "./App.css";

const apiURL = "https://restcountries.com/v3.1";

/**
 * The function `fetchData` fetches data from an API and returns it as a JSON object, handling any
 * errors that occur.
 * @returns the JSON data fetched from the specified API URL.
 */
async function fetchData() {
  try {
    const res = await fetch(`${apiURL}/all`);
    if (!res.ok) throw new Error("Something went wrong!");
    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * The App function is a React component that fetches data, sets state variables, and renders different
 * components based on user interactions and routing.
 * @returns The App component is returning JSX elements, including a div with className "top"
 * containing the Header component, a div with className "containerr" containing a div with className
 * "left" and a div with className "right". Inside the "right" div, there is a Router component with
 * two Route components. The first Route component has a path of "/" and renders the Countries
 * component with the countriesData
 */
function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [countriInfo, setCountriInfo] = useState([]);

  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchData()
      .then((data) => setCountriesData(data))
      .catch((error) => setError(error.message));
  }, []);

  const getCountryByRegion = async (data) => {
    setCountriesData(data);
  };

  const searchCountry = async (data) => {
    setCountriesData(data);
  };
const infoHandl = async (data) => {
  setCountriInfo(data);
};
  return (
    <>
      <div className="top">
        <Header onSelect={searchCountry} />
      </div>
      <div
        className={`containerr ${
          isDarkMode ? "App-dark-mode" : "App-light-mode"
        }`}
      >
        <div className="left">
          <LeftBar onSelect={getCountryByRegion} />
        </div>
        <div className="right">
          <Router>
            <Routes>
              <Route
                path="/"
                element={<Countries countriesData={countriesData} onselect={infoHandl}/>}
              />
              <Route
                path="/country/:countryName"
                className="info"
                element={<CountryInfo countriInfo={ countriInfo} />}
              />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
