import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./countries.css";
import { useTheme } from "../../ThemeContext";

const Countries = ({ countriesData, isLoading }) => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (countriesData.length === 0 && loading) {
    return (
      <section className="all__country__wrapper">
        <div className="loading-spinner"></div>
      </section>
    );
  }

  if (!Array.isArray(countriesData) || countriesData.length === 0) {
    return (
      <section className="all__country__wrapper">
        <p className="error-message">No countries data available.</p>
      </section>
    );
  }

  const getCountryCardClass = () => {
    return isDarkMode ? "country-dark-mode" : "country-light-mode";
  };

  return (
    <section className="all__country__wrapper">
      <section className="country__bottom">
        {countriesData.map((country) => (
          <Link
            key={country.name.common}
            to={`/country/${country.name.common}`}
          >
            <div className={`country__card ${getCountryCardClass()}`}>
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
        ))}
      </section>
    </section>
  );
};

export default Countries;
