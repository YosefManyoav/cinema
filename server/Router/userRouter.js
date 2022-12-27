const express = require('express')
const userBLL = require('../BLL/userBLL')

const router = express.Router();

router.get('/', async (req, res) =>
{
    const usersData = await userBLL.getUsers()
    res.json(usersData)
})

router.post('/', async (req, res) => {
    try {
      const user = req.body;
      const status = await userBLL.createUser(user);
      res.status(200).json(status);
    } catch (e) {
      res.status(500).json(e);
    }
  });
module.exports = router