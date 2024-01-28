import React, { useState } from "react";
import "./Header.css";
import {FaSearch} from 'react-icons/fa'
const apiURL = "https://restcountries.com/v3.1";

export default function Header({ onSelect }) {
  const [countryName, setInput] = useState("");
  const [error, setError] = useState("");

    const submitHandler = async (value) => {
      setInput(value)
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error("Not found any country!");

      const data = await res.json();

      // Send countries data to the parent component
      onSelect(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="header">
      <div className="container">
        <form onSubmit={submitHandler}>
          <div className="search-container">
            <FaSearch class='search-icon'/>
            <input
              type="text"
              placeholder="Search a country......"
              value={countryName}
              onChange={(e) => submitHandler(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
