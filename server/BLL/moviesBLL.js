const Movies = require('../MODEL/moviesModel')
const DALMovie = require('../DAL/movies')

const getDbMovies = async () => {
    try {
      let allMovie = await Movies.find({}) 
      if(allMovie.length<=0){
        const {data :movies} = await DALMovie.getMovies()
        movies.forEach(async (movie) => {
          const summary = movie.summary.replaceAll("<p>","").replaceAll("</p>","").replaceAll("<b>","").replaceAll("</b>","").replaceAll("<i>","").replaceAll("</i>","").replaceAll("<br>","")
          const obj = {
            Name : movie.name,
            Premiered : movie.premiered,
            Image : movie.image.medium,
            Summary : summary
          }
         const newMovie =  new Movies(obj)
         await newMovie.save()
        });
        allMovie = await Movies.find({}) 
      }
      return allMovie
    } catch (error) {
      
    }
  
}
const getIdMovies = async (id) => {
    const moviesCol = await Movies.findById(id)
    return moviesCol
  
}

const updateMovie = async (id, obj) => {
    try {
    //   await Movies.findByIdAndUpdate(id, obj);
      await Movies.findByIdAndUpdate(id, obj);
      return 'Updated';
    } catch (error) {
      throw `Error: ${error}`;
    }
};

const createMovie = async (obj) => {
  try {
    const user = new Movies(obj);
    await user.save(); // saves obj to data base
    return 'Created';
  } catch (error) {
    throw `Error: ${error}`;
  }
};

const deleteMovie = async (id) => {
    try {
      await Movies.findByIdAndDelete(id);
      return 'Deleted';
    } catch (error) {
      throw `Error: ${error}`;
    }
};  




module.exports = {getDbMovies, updateMovie, deleteMovie, getIdMovies, createMovie}