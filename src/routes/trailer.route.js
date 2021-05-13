const express = require('express')
const router = express.Router()
const { getMovieResource, getTrailer } = require('../controllers/trailer.controller');
const redisClient = require('../../config/redisClient');

router.get('/', async (req, res) => {
    const url = req.query.url;
    if(!url) {
        res.status(400).json({
            code: 2,
            message: 'URL is empty' 
        })
    }

    try {        
        const movieResource = await getMovieResource(url);

        if(movieResource.code) {
            res.status(400).json(movieResource);
        }

        const trailer = await getTrailer(movieResource);

        if(trailer.code) {
            res.status(400).json(trailer);
        }

        const response = {
            imdb: movieResource,
            trailer,
        };

        redisClient.setAsync(req.originalUrl, JSON.stringify(response), 'EX', 7200)
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            code: 1,
            message: 'Unexpected error',
            stack: err
        })
    }
});

module.exports = router;