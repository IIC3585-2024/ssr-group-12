import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmY0MWYxYzlmMzZiYmE0OTNmNDk3MTMwNzE5M2U4ZSIsIm5iZiI6MTcxOTI2NTAzNi4yMTA1MzMsInN1YiI6IjY2NzllNjk0OGM0ZGYzZjliMzRjYTMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RFov1Plip2dOYRH0g4TOKxoaH7hem7dgNpwjpwWlThI";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (endpoint) => {
  const options = {
    method: "GET",
    url: BASE_URL + endpoint,
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmY0MWYxYzlmMzZiYmE0OTNmNDk3MTMwNzE5M2U4ZSIsIm5iZiI6MTcxOTI2NTAzNi4yMTA1MzMsInN1YiI6IjY2NzllNjk0OGM0ZGYzZjliMzRjYTMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RFov1Plip2dOYRH0g4TOKxoaH7hem7dgNpwjpwWlThI",
    },
  };
  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const fetchPoster = (posterPath, size = "w500") => {
  return `https://image.tmdb.org/t/p/${size}/${posterPath}`;
};

export const fetchSeries = async (endpoint) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const fetchSeriesByName = (movieName) => {
  const options = {
    method: "GET",
    url: BASE_URL + "/search/tv",
    params: { query: movieName },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
