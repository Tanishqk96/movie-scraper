import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
const countryNameMap = {
  AF: "Afghanistan",
  AL: "Albania",
  AS: "American Samoa",
  AI: "Anguilla",
  AR: "Argentina",
  AM: "Armenia",
  AU: "Australia",
  AT: "Austria",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BJ: "Benin",
  BM: "Bermuda",
  BR: "Brazil",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CF: "Central African Republic",
  CL: "Chile",
  CN: "China",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  CR: "Costa Rica",
  HR: "Croatia",
  CU: "Cuba",
  CW: "Curaçao",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  GQ: "Equatorial Guinea",
  EE: "Estonia",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GR: "Greece",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran",
  IE: "Ireland",
  IL: "Israel",
  IT: "Italy",
  JP: "Japan",
  KZ: "Kazakhstan",
  KW: "Kuwait",
  LV: "Latvia",
  LB: "Lebanon",
  LR: "Liberia",
  LY: "Libya",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macau",
  MY: "Malaysia",
  MV: "Maldives",
  MH: "Marshall Islands",
  MX: "Mexico",
  ME: "Montenegro",
  MM: "Myanmar",
  NP: "Nepal",
  NL: "Netherlands",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NG: "Nigeria",
  NO: "Norway",
  PK: "Pakistan",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RO: "Romania",
  RU: "Russia",
  SA: "Saudi Arabia",
  RS: "Serbia",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  ZA: "South Africa",
  KR: "South Korea",
  ES: "Spain",
  LK: "Sri Lanka",
  SE: "Sweden",
  CH: "Switzerland",
  TW: "Taiwan",
  TH: "Thailand",
  TR: "Turkey",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UY: "Uruguay",
  VE: "Venezuela",
  VN: "Vietnam",
};
export default function IMDbScraper() {
  const [data, setData] = useState(null);
  const [countryCodes, setCountryCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("IN");
  const [type, setType] = useState("MOVIE");

  const fallbackImage =
    "https://img.freepik.com/free-photo/movie-background-collage_23-2149876003.jpg";

  // Fetch country codes on component mount
  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await axios.get(
          "https://imdb236.p.rapidapi.com/imdb/upcoming-releases-country-codes",
          {
            headers: {
              "x-rapidapi-key": "53c96ff072msh2ce28742151e066p1c027ajsnc658f4b96a97",
              "x-rapidapi-host": "imdb236.p.rapidapi.com",
            },
          }
        );
        setCountryCodes(response.data);
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
    };

    fetchCountryCodes();
  }, []);

  const fetchIMDbData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://imdb236.p.rapidapi.com/imdb/upcoming-releases",
        {
          params: { countryCode, type },
          headers: {
            "x-rapidapi-key": "53c96ff072msh2ce28742151e066p1c027ajsnc658f4b96a97",
            "x-rapidapi-host": "imdb236.p.rapidapi.com",
          },
        }
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-9xl">
        <h1 className="text-2xl font-bold text-center mb-4 text-black">
          IMDb Upcoming Releases
        </h1>

        {/* Country Code Dropdown */}
         {/* Country Code Dropdown */}
         <div className="flex flex-col space-y-2 mb-4">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select a Country</option>
            {countryCodes.map((code) => (
              <option key={code} value={code}>
                {countryNameMap[code] ? `${countryNameMap[code]} (${code})` : code}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter Type (e.g., MOVIE, TV)"
            value={type}
            onChange={(e) => setType(e.target.value.toUpperCase())}
            className="border p-2 rounded"
          />
        </div>


        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          onClick={fetchIMDbData}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch IMDb Data"}
        </button>

        {data && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Upcoming Releases:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.map((release) =>
                release.titles.map((movie) => {
                  const imdbUrl = `https://www.imdb.com/title/${movie.id}/`;
                  return (
                    <div
                      key={movie.id}
                      className="bg-purple-500 p-4 rounded-lg shadow-lg flex flex-col"
                    >
                      <a
                        href={imdbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black font-bold hover:underline"
                      >
                        {movie.primaryTitle}
                      </a>
                      <img
                        src={movie.primaryImage || fallbackImage}
                        alt={movie.primaryTitle}
                        className="w-full h-48 object-cover rounded-lg mt-2"
                      />
                      <p className="text-black mt-2">
                        <strong>Description:</strong>{" "}
                        {movie.description || "No description available."}
                      </p>
                      <p className="text-black">
                        <strong>Runtime:</strong>{" "}
                        {movie.runtimeMinutes
                          ? `${movie.runtimeMinutes} min`
                          : "N/A"}
                      </p>
                      <p className="text-black">
                        <strong>PG Rating:</strong>{" "}
                        {movie.contentRating || "Not Rated"}
                      </p>
                      <p className="text-black">
                        <strong>Release Date:</strong>{" "}
                        {movie.releaseDate || "Release date not available"}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
