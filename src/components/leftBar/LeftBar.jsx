import React, { useState } from "react";
import "./LeftBar.css";
import {} from "react-icons/fa";
import { useTheme } from "../../ThemeContext";

const apiURL = "https://restcountries.com/v3.1";

const LeftBar = ({ onSelect }) => {
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();
  const selectHandler = async (regionName) => {
    try {
      const res = await fetch(`${apiURL}/region/${regionName}`);
      if (!res.ok) throw new Error("Not found!");
      const data = await res.json();
      onSelect(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="left-container">
      <ul className={isDarkMode ? "left-ul-dark-mode" : "left-ul-light-mode"}>
        <li
          className={`option ${
            isDarkMode ? "left-dark-mode" : "left-light-mode"
          }`}
          onClick={() => selectHandler("Africa")}
        >
          Africa
        </li>
        <li
          className={`option ${
            isDarkMode ? "left-dark-mode" : "left-light-mode"
          }`}
          onClick={() => selectHandler("America")}
        >
          America
        </li>
        <li
          className={`option ${
            isDarkMode ? "left-dark-mode" : "left-light-mode"
          }`}
          onClick={() => selectHandler("Asia")}
        >
          Asia
        </li>
        <li
          className={`option ${
            isDarkMode ? "left-dark-mode" : "left-light-mode"
          }`}
          onClick={() => selectHandler("Europe")}
        >
          Europe
        </li>
        <li
          className={`option ${
            isDarkMode ? "left-dark-mode" : "left-light-mode"
          }`}
          onClick={() => selectHandler("Oceania")}
        >
          Oceania
        </li>
      </ul>
    </div>
  );
};

export default LeftBar;
