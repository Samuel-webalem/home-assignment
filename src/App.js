import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Countries from "./components/countries/countries";
import CountryInfo from "./components/countriesInformation/countriesInformation";
import Header from "./components/Header/Header";
import LeftBar from "./components/leftBar/LeftBar";

import { useTheme } from "./ThemeContext";

const apiURL = "https://restcountries.com/v3.1";

async function fetchData() {
  try {
    const res = await fetch(`${apiURL}/all`);
    if (!res.ok) throw new Error("Something went wrong!");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchData()
      .then((data) => {
        setCountriesData(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const getCountryByRegion = async (data) => {
    setCountriesData(data);
  };
  const searchCountry = async (data) => {
    setCountriesData(data);
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
          {" "}
          <Router>
            <Routes>
              <Route
                path="/"
                element={<Countries countriesData={countriesData} />}
              />
              <Route path="/country/:countryName" className='info' element={<CountryInfo />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
