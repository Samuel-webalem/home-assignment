import React, { useState } from "react";
import "./LeftBar.css";
import { useTheme } from "../../ThemeContext";

const apiURL = "https://restcountries.com/v3.1";

/**
 * The `LeftBar` component is a React component that displays a list of regions and handles the
 * selection of a region by making an API call and passing the selected data to a callback function.
 * @returns The LeftBar component is returning a div element with a className of "left-container" and
 * an unordered list element with a className that depends on the value of isDarkMode. The unordered
 * list contains several list items, each with a className that also depends on the value of
 * isDarkMode. Each list item has an onClick event handler that calls the selectHandler function with a
 * specific regionName as an argument
 */
const LeftBar = ({ onSelect }) => {
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();

 /**
  * The function `selectHandler` is an asynchronous function that fetches data from an API based on a
  * given region name and calls a callback function with the retrieved data, or sets an error message
  * if the request fails.
  */
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