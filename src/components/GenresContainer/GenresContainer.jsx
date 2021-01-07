import React, { useState, useEffect } from "react";

import {
  getAvailableGenres,
  getAccessToken,
  genresToFilter,
} from "../../api/spotifyApi";

import "./GenresContainer.css";

import Chip from "../Chip/Chip";
import Button from "../Button/Button";

const GenresContainer = ({ onSelectedGenres }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [next, setNext] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: { access_token },
      } = await getAccessToken();

      const {
        data: { genres },
      } = await getAvailableGenres(access_token);
      setGenres(genres.filter((genre) => !genresToFilter.includes(genre)));
    })();
  }, []);

  const addOrRemoveGenre = (e) => {
    const { value } = e.target;
    if (selectedGenres.indexOf(value) === -1) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    }
  };

  const handleOnClickButton = () => {
    setGenres(selectedGenres);
    setNext(true);
    onSelectedGenres(selectedGenres);
  };

  return (
    <>
      {next ? "" : <h1>Choose up to 5 genres</h1>}
      <div className="chips-container">
        {next ? <h3>Selected genres:</h3> : ""}
        {genres.map((genre, index) => (
          <Chip
            key={index}
            title={genre}
            disabled={selectedGenres.length === 5 || next ? true : false}
            onChange={addOrRemoveGenre}
          />
        ))}
      </div>
      {next ? (
        ""
      ) : (
        <div className="button-container">
          <Button
            title="Continue"
            onClick={handleOnClickButton}
            disabled={selectedGenres.length > 0 ? false : true}
          />
        </div>
      )}
    </>
  );
};

export default GenresContainer;
