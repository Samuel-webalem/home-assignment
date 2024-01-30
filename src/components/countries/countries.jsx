/* This is a functional component called "Countries" It is responsible for
rendering a list of countries with their information. */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./countries.css";
import { useTheme } from "../../ThemeContext";
import { useError } from "../../ErrorContext";

/* The `Countries` component is a functional component It takes in three props:
`countriesData`, `isLoading`, and `onselect`. */
const Countries = ({ countriesData, isLoading, onselect }) => {
  const { isDarkMode } = useTheme();
  const { error, clearError, setErrorMsg } = useError();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState("");

  /* The `useEffect` hook in the code snippet is used to set a timer that will change the value of the
  `loading` state variable after 2000 milliseconds (2 seconds). */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /* This hook in the code snippet is used to handle side effects in the component. In this
  case, it is checking if the `countriesData` prop is not an array or if it is an empty array. If
  either of these conditions is true, it means that there is no countries data available. */
  useEffect(() => {
    if (!Array.isArray(countriesData) || countriesData.length === 0) {
      clearError();
      setErrorMsg("No countries data available.");
    }
  }, [countriesData, clearError, setErrorMsg]);

  const getCountryCardClass = () => {
    return isDarkMode ? "country-dark-mode" : "country-light-mode";
  };

  const infoHandler = (country) => {
    onselect(country);
  };

  return (
    <section className="all__country__wrapper">
      {loading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!loading && (
        <section className="country__bottom">
          {Array.isArray(countriesData) ? (
            countriesData.map((country) => (
              <Link
                key={country.name.common}
                to={`/country/${country.name.common}`}
              >
                <div
                  className={`country__card ${getCountryCardClass()}`}
                  onClick={() => {
                    setInfo(country);
                    infoHandler(country);
                  }}
                >
                  <div className="country__img">
                    <img src={country.flags.png} alt="" />
                  </div>
                  <div className="country__data">
                    <h3>{country.name.common}</h3>
                    <h6>Region: {country.region}</h6>
                    <h6>Capital: {country.capital}</h6>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="error-message">{error.message}</p>
          )}
        </section>
      )}
    </section>
  );
};

export default Countries;
