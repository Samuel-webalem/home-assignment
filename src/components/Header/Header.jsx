// Header.js
import React, { useState } from "react";
import "./Header.css";
import { FaSearch, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { useTheme } from "../../ThemeContext";

const apiURL = "https://restcountries.com/v3.1";

export default function Header({ onSelect, onThemeChange }) {
  const [countryName, setInput] = useState("");
  const [error, setError] = useState({ status: false, message: "" });
  const [sortOption, setSortOption] = useState("Relevant"); // Default sort option is by name
  const { toggleTheme, isDarkMode } = useTheme();

  const validateInput = (input) => {
    if (!input.trim()) {
      setError({
        status: true,
        message: "Please enter a country name",
      });
      return false;
    }

    setError({
      status: false,
      message: "",
    });

    return true;
  };


  const submitHandler = async () => {
    if (!validateInput(countryName)) {
      // If input is empty, fetch all countries
      const allCountriesRes = await fetch(`${apiURL}/all`);
      const allCountriesData = await allCountriesRes.json();
      onSelect(allCountriesData);
      return;
    }

    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) {
        setError({
          status: true,
          message: "Country not found!",
        });
        onSelect([]); // Clear the countries data when no country is found
        return;
      }

      setError({
        status: false,
        message: "",
      });

      const data = await res.json();
      // Send countries data to the parent component
      onSelect(data);
    } catch (error) {
      setError({
        status: true,
        message: error.message,
      });
    }
  };

  const handleChange = async (value) => {
    setInput(value);
    submitHandler();
  };

  const handleClear = async () => {
    setInput("");
    setError({
      status: false,
      message: "",
    });

    const allCountriesRes = await fetch(`${apiURL}/all`);
    const allCountriesData = await allCountriesRes.json();
    onSelect(allCountriesData);
  };

  const handleSortChange = async (value) => {
    setSortOption(value);

    try {
      // Fetch all countries and sort based on the selected option
      const res = await fetch(`${apiURL}/all`);
      let data = await res.json();
      const seter = data;
      if (value === "name") {
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      } else if (value === "population") {
        data.sort((a, b) => b.population - a.population);
      } else if (value === "") {
        data = seter;
      }

      // Send sorted countries data to the parent component
      onSelect(data);
    } catch (error) {
      console.error("Error fetching and sorting countries:", error);
    }
  };

  return (
    <div className={`header ${isDarkMode ? "light-mode" : "dark-mode"}`}>
      <div className="container">
        <div className="search-container">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Search"
            className="input"
            value={countryName}
            onChange={(e) => handleChange(e.target.value)}
          />
          {countryName && (
            <FaTimes className="clear-icon" onClick={handleClear} />
          )}
        </div>
        <div className="sort-container">
          <select
            id="sortSelect"
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="" className="option">
              Relevalnt
            </option>
            <option value="name" className="option">
              Name
            </option>
            <option value="population" className="option">
              Population
            </option>
          </select>
        </div>

        <div className="theme" onClick={toggleTheme}>
          {isDarkMode ? (
            <FaSun className="icon" />
          ) : (
            <FaMoon className="icon" />
          )}
          <h5>{isDarkMode ? "Light" : "Dark"} Mode</h5>
        </div>
      </div>
    </div>
  );
}
