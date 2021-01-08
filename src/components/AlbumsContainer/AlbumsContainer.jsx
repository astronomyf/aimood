import React from "react";

import "./AlbumsContainer.css";

import Album from "../AlbumCover/AlbumCover";

const AlbumsContainer = ({ tracks }) => {
  return (
    <div className="albums--container">
      {tracks.map((track) => (
        <Album
          key={track.id}
          songName={track.name}
          albumName={track.album.name}
          artistName={track.artists[0].name}
          albumCover={track.album.images[1].url}
          spotifyUrl={track.external_urls.spotify}
        />
      ))}
    </div>
  );
};

export default AlbumsContainer;
