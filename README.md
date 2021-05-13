# Code Challenge Via Play

Rest API created for providing clients with trailer URLs.

## Technologies used

 1. Node
 2. Express
 3. Docker
 4. Redis (cache)
 5. Jest

## Get started
### Install
`yarn` 
`npm install`

### Run Docker
`docker-compose up`

### Run
`yarn start`
`yarn start:watch` (nodemon)

### Test
`yarn run test`

## Usage
### Get Trailer URL
To get the trailers, just make a GET request to the "/trailer" endpoint, passing the movie resource link.

e.g.:
GET: http://localhost:5000/trailer?url=https://content.viaplay.se/pc-se/film/arrival-2016

Response: 
```json
{
  "imdb": {
    "id": "tt2543164",
    "rating": "7.9",
    "votes": "609 699",
    "url": "http://www.imdb.com/title/tt2543164?ref_ext_viaplay"
  },
  "trailer": "https://www.youtube.com/watch?v=tFMo3UJ4B4g"
}
```


## CACHE
To optimize the requests made, Redis (https://redis.io/) was used for Cache.
The keys saved in the cache are set to expire after 2 hours.
