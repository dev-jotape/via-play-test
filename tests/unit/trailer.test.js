const { tmdbApi, viaPlayApi } = require('../../config/api');
const { getTrailer, getMovieResource } = require('../../src/controllers/trailer.controller');

jest.mock('../../config/api');

describe('Trailer service test', () => {
    describe('getMovieResource function', () => {
        it('should return success', async () => {
            viaPlayApi.get.mockImplementation(() => Promise.resolve({
                data: {
                    _embedded: {
                        "viaplay:blocks": [{
                            _embedded: {
                                "viaplay:product": {
                                    content: {
                                        imdb: {
                                            id: "tt2543164",
                                            rating: "7.9",
                                            votes: "609 699",
                                            url: "http://www.imdb.com/title/tt2543164?ref_ext_viaplay"
                                        }
                                    }
                                }
                            }
                        }]
                    }
                }
            }));

            const response = await getMovieResource('https://content.viaplay.se/pc-se/film/arrival-2016');
            expect(response).toEqual({
                id: "tt2543164",
                rating: "7.9",
                votes: "609 699",
                url: "http://www.imdb.com/title/tt2543164?ref_ext_viaplay"
            })
        });

        it('should return Movie not found', async () => {
            viaPlayApi.get.mockImplementation(() => Promise.resolve({
                data: null
            }));

            const response = await getMovieResource('https://content.viaplay.se/pc-se/film/arrival-2016');
            expect(response).toEqual({
                code: 3,
                message: 'Movie not found'
            })
        });

        it('should return Failed to find movie', async () => {
            viaPlayApi.get.mockImplementation(() => Promise.reject());

            const response = await getMovieResource('https://content.viaplay.se/pc-se/film/arrival-2016');
            expect(response).toEqual({ code: 4, message: 'Failed to find movie', stack: undefined })
        });
    });

    describe('getTrailer function', () => {
        it('should return success', async () => {
            tmdbApi.get.mockImplementation(() => Promise.resolve({
                data: {
                    results: [
                        {
                          id: '57aa147c92514111750014eb',
                          iso_639_1: 'en',
                          iso_3166_1: 'US',
                          key: 'gwqSi_ToNPs',
                          name: 'TV Spot',
                          site: 'YouTube',
                          size: 1080,
                          type: 'Teaser'
                        },
                        {
                          id: '57d93c66c3a36852f4005907',
                          iso_639_1: 'en',
                          iso_3166_1: 'US',
                          key: 'tFMo3UJ4B4g',
                          name: 'Trailer',
                          site: 'YouTube',
                          size: 1080,
                          type: 'Trailer'
                        }
                    ]
                }
            }));
    
            const response = await getTrailer({ id: 123 });
            expect(response).toEqual('https://www.youtube.com/watch?v=tFMo3UJ4B4g')
        });
    
        it('should return Trailer not found', async () => {
            tmdbApi.get.mockImplementation(() => Promise.resolve({
                data: {
                    results: []
                }
            }));
    
            const response = await getTrailer({ id: 123 });
            expect(response).toEqual({
                code: 5,
                message: 'Trailer not found'
            })
        });

        it('should return Failed to find trailer', async () => {
            tmdbApi.get.mockImplementation(() => Promise.reject());
    
            const response = await getTrailer({ id: 123 });
            expect(response).toEqual({
                code: 6,
                message: 'Failed to find trailer',
                stack: undefined
            })
        });
    });
});