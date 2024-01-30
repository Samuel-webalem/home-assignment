import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./countries.css";
import { useTheme } from "../../ThemeContext";
import { useError } from "../../ErrorContext";

const Countries = ({ countriesData, isLoading, onselect }) => {
  const { isDarkMode } = useTheme();
  const { error, clearError, setErrorMsg } = useError();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
    </section>
  );
};

export default Countries;
