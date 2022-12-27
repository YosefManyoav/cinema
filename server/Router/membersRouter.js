const express = require('express')
const membersBLL = require('../BLL/membersBLL')

const router = express.Router();

router.get('/', async (req, res) =>
{
    try{
        const membersData = await membersBLL.getDbMembers()
        res.status(200).json(membersData)
    }catch(error){
        res.status(500).json({msg:error})
    }

})

module.exports = router