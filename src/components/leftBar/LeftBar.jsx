import React, { useState } from "react";
import './LeftBar.css'
const apiURL = "https://restcountries.com/v3.1";

const LeftBar = ({ onSelect }) => {
  const [error, setError] = useState("");

  const selectHandler =async (regionName) => {
    try {
      const res = await fetch(`${apiURL}/region/${regionName}`);
      if (!res.ok) throw new Error("Not found!");
      const data = await res.json();
      onSelect(regionName,data);
    } catch (error) {
      setError(error.message);
    }
  };

 
  return (
    <ul>
      <li className="option" onClick={() => selectHandler("Africa")}>
        Africa
      </li>
      <li className="option" onClick={() => selectHandler("America")}>
        America
      </li>
      <li className="option" onClick={() => selectHandler("Asia")}>
        Asia
      </li>
      <li className="option" onClick={() => selectHandler("Europe")}>
        Europe
      </li>
      <li className="option" onClick={() => selectHandler("Oceania")}>
        Oceania
      </li>
    </ul>
  );
};

export default LeftBar;
