const express = require('express')
const movieBLL = require('../BLL/moviesBLL')

const router = express.Router();

router.get('/', async (req, res) =>
{
    try{
        const moviesData = await movieBLL.getDbMovies()
        res.status(200).json(moviesData)
    }catch(error){
        res.status(500).json({msg:error})
    }

})

router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const obj = req.body;
      const status = await movieBLL.updateMovie(id, obj);
      res.status(200).json(status);
    } catch (e) {
      res.status(500).json(e);
    }
});

router.post('/', async (req, res) => {
  try {
    const user = req.body;
    const status = await movieBLL.createMovie(user);
    res.status(200).json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const status = await movieBLL.deleteMovie(id);
      res.status(200).json(status);
    } catch (e) {
      res.status(500).json(e);
    }
  });
  
router.get('/:id', async (req, res) => {
  try{
  const { id } = req.params;
  const status = await movieBLL.getIdMovies(id);
  res.status(200).json(status);
} catch (e) {
  res.status(500).json(e);
}
})
module.exports = router