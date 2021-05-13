const { tmdbApi, viaPlayApi } = require('../../config/api');

const getMovieResource = async (url) => {
    try {
        const response = await viaPlayApi.get(url);
        if(!response || !response.data) {
            return {
                code: 3,
                message: 'Movie not found'
            }
        }

        return response.data._embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb;
    } catch (error) {
        return {
            code: 4,
            message: 'Failed to find movie',
            stack: error
        }
    }
};

const getTrailer = async (movie) => {
    try {
        const response = await tmdbApi.get(`${movie.id}/videos`);
        if(!response || !response.data || !response.data.results.length) {
            return {
                code: 5,
                message: 'Trailer not found'
            }
        };

        const trailerFiltered = response.data.results.find(el => el.site.toUpperCase() === 'YOUTUBE' && el.type.toUpperCase() === 'TRAILER');
        if(!trailerFiltered.key) {
            return {
                code: 5,
                message: 'Trailer not found'
            }
        }

        return 'https://www.youtube.com/watch?v=' + trailerFiltered.key;
    } catch (error) {
        return {
            code: 6,
            message: 'Failed to find trailer',
            stack: error
        }
    }
};

module.exports = { getMovieResource, getTrailer }