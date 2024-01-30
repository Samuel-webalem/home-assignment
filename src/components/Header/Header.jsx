import React, { useState } from "react";
import "./Header.css";
import { FaSearch, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { useTheme } from "../../ThemeContext";
import { useError } from "../../ErrorContext";

const apiURL = "https://restcountries.com/v3.1";

export default function Header({ onSelect }) {
  const [countryName, setInput] = useState("");
  const { setErrorMsg, clearError } = useError();
  const { toggleTheme, isDarkMode } = useTheme();
  const [sortOption, setSortOption] = useState("Relevant");

  const validateInput = (input) => {
    if (!input.trim()) {
      setErrorMsg("Please enter a country name");
      return false;
    }

    clearError();
    return true;
  };

  const submitHandler = async () => {
    if (!validateInput(countryName)) {
      try {
        const allCountriesRes = await fetch(`${apiURL}/all`);
        const allCountriesData = await allCountriesRes.json();
        onSelect(allCountriesData);
      } catch (error) {
        setErrorMsg("Error fetching all countries");
        console.error("Error fetching all countries:", error);
      }
      return;
    }

    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) {
        setErrorMsg("Country not found!");
        onSelect({ status: true, message: "Country not found!" });
        return;
      }

      const data = await res.json();
      onSelect(data);
    } catch (error) {
      setErrorMsg("Error fetching country by name");
      console.error("Error fetching country by name:", error);
    }
  };

  const handleChange = async (value) => {
    setInput(value);
    if (value.trim() === "") {
      // Clear error when the input is empty
      clearError();
      try {
        const allCountriesRes = await fetch(`${apiURL}/all`);
        const allCountriesData = await allCountriesRes.json();
        onSelect(allCountriesData);
      } catch (error) {
        setErrorMsg("Error fetching all countries");
        console.error("Error fetching all countries:", error);
      }
    } else {
      // Validate and submit
      submitHandler();
    }
  };

  const handleClear = async () => {
    setInput("");
    clearError();

    try {
      const allCountriesRes = await fetch(`${apiURL}/all`);
      const allCountriesData = await allCountriesRes.json();
      onSelect(allCountriesData);
    } catch (error) {
      setErrorMsg("Error fetching all countries");
      console.error("Error fetching all countries:", error);
    }
  };

  const handleSortChange = async (value) => {
    try {
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

      onSelect(data);
    } catch (error) {
      setErrorMsg("Error fetching and sorting countries");
      console.error("Error fetching and sorting countries:", error);
    }
    setSortOption(value);
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
              Relevant
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
