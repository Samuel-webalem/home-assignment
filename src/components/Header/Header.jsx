import React, { useState } from "react";
import "./Header.css";

import { FaSearch, FaMoon } from "react-icons/fa";
import { useTheme } from "../../ThemeContext";
const apiURL = "https://restcountries.com/v3.1";

export default function Header({ onSelect, onThemeChange }) {
  const [countryName, setInput] = useState("");
  const [error, setError] = useState("");
  const { toggleTheme, isDarkMode } = useTheme();

  const submitHandler = async (value) => {
    setInput(value);
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error("Not found any country!");

      const data = await res.json();
      console.log(data);

      // Send countries data to the parent component
      onSelect(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={`header ${isDarkMode ? "light-mode" : "dark-mode"}`}>
      <div className="container">
        <form onSubmit={submitHandler}>
          <div className="search-container">
            <FaSearch class="icon" />
            <input
              type="text"
              placeholder="Search"
              className="input"
              value={countryName}
              onChange={(e) => submitHandler(e.target.value)}
            />
          </div>
        </form>
        <div className="theme" onClick={toggleTheme}>
          <FaMoon className="icon" />
          <h5> {isDarkMode ? "Dark" : "Light"} Mode</h5>
        </div>
      </div>
    </div>
  );
}
