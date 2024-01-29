import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./countriesInformation.css";


const apiURL = "https://restcountries.com/v3.1";

const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [error, setError] = useState("");
  const [viewPort, setViewPort] = useState({
    latitude: "",
    longitude: "",
    zoom: 6,
  });


  const { countryName } = useParams();


  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();
        setCountry(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  return (
    <div className="country__info__wrapper">
      <button>
        <Link to="/">Back</Link>
      </button>

      {error && <div>{error}</div>}

      {country?.map((country, index) => (
        <div className="country__info__container" key={index}>
          <div className="country__info-img">
            <img src={country.flags.png} alt={country.name.common} />
          </div>

          <div className="country__info">
            <h3>{country.name.common}</h3>

            <div className="country__info-left">
              <h5>
                Population:{" "}
                <span>
                  {new Intl.NumberFormat().format(country.population)}
                </span>
              </h5>

              <h5>
                Region: <span>{country.region}</span>
              </h5>
              <h5>
                Sub Region: <span>{country.subregion}</span>
              </h5>
              <h5>
                Capital: <span>{country.capital}</span>
              </h5>
              <h5>
                Languages:{" "}
                <span>{Object.values(country.languages).join(", ")}</span>
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

};

export default CountryInfo;
