const axios = require('axios')

const membersUrl = 'https://jsonplaceholder.typicode.com/users'
const getMembers = () => axios.get(membersUrl)

module.exports = {getMembers}