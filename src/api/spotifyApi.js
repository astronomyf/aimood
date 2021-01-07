import axios from "axios";
import querystring from "querystring";

export const getAccessToken = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

  const url = "https://accounts.spotify.com/api/token";

  return axios({
    method: "post",
    url: url,
    data: querystring.stringify({ grant_type: "client_credentials" }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
  });
};

/*
Mood:

happy, sad, surprised, disgusted, angry, fearful

- Happy = high valence, high danceability
- Angry = high energy, low valence, high tempo
- Sad = very low valence, low energy,
- Surprised = high denceability, high energy + (2 random genres)
- Fearful = high instrumentalness, medium valence, low energy
*/
const moodToSpotifyAttributes = (mood) => {
  switch (mood) {
    case "happy":
      return "&target_valence=0.9&target_danceability=0.8";
    case "sad":
      return "&target_valence=0.1&target_energy=0.2";
    case "angry":
      return "&target_energy=0.9&target_valence=0.2&min_tempo=130";
    case "surprised":
      return "&target_danceability=0.9&target_energy=1";
    case "fearful":
      return "&target_instrumentalness=0.8&target_valence=0.5&target_energy=0.2";
    default:
      return "&target_valence=0.5";
  }
};

/**
 * Get Spotify recommendations based on given generes and detected mood.
 * @param {string} accessToken Spotify access token.
 * @param {number} mood numeric value of the detected mood.
 * @param {object} genres array of selected generes.
 */
export const getRecommendations = (accessToken, mood, genres) => {
  const BASE_URL = "https://api.spotify.com/v1/recommendations?";
  const url =
    BASE_URL +
    "seed_genres=" +
    genres.join(",") +
    moodToSpotifyAttributes(mood) +
    "&limit=10";

  return axios({
    method: "get",
    url: url,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

export const getAvailableGenres = (accessToken) => {
  const url =
    "https://api.spotify.com/v1/recommendations/available-genre-seeds";

  return axios({
    method: "get",
    url: url,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

// Array of genres to be filtered from the result returned
export const genresToFilter = [
  "anime",
  "bluegrass",
  "cantopop",
  "children",
  "comedy",
  "detroit-techno",
  "disney",
  "forro",
  "happy",
  "holidays",
  "honky-tonk",
  "indian",
  "iranian",
  "j-dance",
  "j-idol",
  "j-pop",
  "j-rock",
  "kids",
  "malay",
  "mandopop",
  "metal-music",
  "movies",
  "mbp",
  "new-release",
  "pagode",
  "party",
  "philippines-opm",
  "pop-film",
  "rainy-day",
  "road-trip",
  "sad",
  "sertanejo",
  "show-tunes",
  "study",
  "summer",
  "turkish",
  "work-out",
  "british",
  "brazil",
  "french",
  "german",
  "latino",
  "swedish",
];
