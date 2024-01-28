import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Countries from "./components/countries/countries";
import CountryInfo from "./components/countriesInformation/countriesInformation";
import Header from "./components/Header/Header";
import LeftBar from "./components/leftBar/LeftBar";

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
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [countriesData, setCountriesData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData()
      .then((data) => {
        setCountriesData(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const getCountryByRegion = async (regionName, data) => {
    setSelectedRegion(regionName);
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
      <div className="container">
        <div className="left">
          <LeftBar onSelect={getCountryByRegion} />
        </div>
        <div className="right">
          {" "}
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Countries
                    countriesData={countriesData}
                    regionData={selectedRegion}
                  />
                }
              />
              <Route path="/country/:countryName" element={<CountryInfo />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
