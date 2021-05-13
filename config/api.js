const axios = require('axios');

const tmdbApi = axios.create({
  baseURL: process.env.URL_TMDB,
  headers: {
    Authorization: 'Bearer ' + process.env.TMDB_TOKEN,
  },
});

const viaPlayApi = axios.create();

module.exports = { tmdbApi, viaPlayApi }