import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./countries.css";
import { useTheme } from "../../ThemeContext";

const Countries = ({ countriesData }) => {
  const [countries, setCountries] = useState([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const sortedCountries = [...countriesData].sort((a, b) => {
      return a.name.common.localeCompare(b.name.common);
    });

    setCountries(sortedCountries);
  }, [countriesData]);
  return (
    <div className="all__country__wrapper">
      <div className="country__bottom">
        {countries?.map((country) => (
          <Link
            key={country.name.common}
            to={`/country/${country.name.common}`}
          >
            <div
              className={`country__card ${
                isDarkMode ? "country-dark-mode" : "country-light-mode"
              }`}
              key={country.name.common}
            >
              <div className="country__img">
                <img src={country.flags.png} alt="" />
              </div>

              <div className="country__data">
                <h3>{country.name.common}</h3>
                <h6> Region: {country.region}</h6>
                <h6>Capital: {country.capital}</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Countries;
