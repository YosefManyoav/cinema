const axios = require('axios')

const getMovies = () => {
   const res = axios.get('https://api.tvmaze.com/shows')
return res
}

module.exports = { getMovies}