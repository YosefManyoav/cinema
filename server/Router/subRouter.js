const express = require('express')
const subBLL = require('../BLL/subBLL')

const router = express.Router();

router.get('/', async (req, res) =>
{
    const subsData = await subBLL.getSub()
    res.json(subsData)
})

router.get('/movie/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const status = await subBLL.movieWatched(id)
        res.status(200).json(status)
    } catch (error) {
        res.status(500).json(error) 
    }
})

router.get('/member/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const status = await subBLL.memberWatched(id)
        res.status(200).json(status)
    } catch (error) {
        res.status(500).json(error) 
    }
})


router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const movieId = req.body.movieId;
      const status = await subBLL.addMovie(id, movieId);
      res.status(200).json(status);
    } catch (e) {
      res.status(500).json(e);
    }
});

module.exports = router