import React from "react";

import "./AlbumCover.css";
import SpotifyLogo from "../../images/spotify.svg";

const AlbumCover = ({
  songName,
  albumName,
  albumCover,
  artistName,
  spotifyUrl,
}) => {
  return (
    <div className="album--container">
      <img
        src={albumCover}
        className="album--cover"
        alt={`Cover for ${albumName} album`}
      />
      <h4 title={songName}>{songName}</h4>
      <div className="album--description">
        <strong>{artistName}</strong>
        <br />
        <span title={albumName}>{albumName}</span>
      </div>
      <hr />
      <ButtonForSpotify title="Listen" link={spotifyUrl} />
    </div>
  );
};

const ButtonForSpotify = ({ title, link }) => {
  return (
    <>
      <a
        href={link}
        className="spotify--button"
        target="_blank"
        rel="noreferrer"
      >
        <img src={SpotifyLogo} className="spotify--logo" alt="Spotify logo" />
        {title}
      </a>
    </>
  );
};

export default AlbumCover;
