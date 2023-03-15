const Users = require ('../MODEL/userModel')

const getUsers = async () => {
    try{
        return await Users.find({})
    }catch (error){
        throw `error:${error}`
    }
};

const createUser = async (obj) => {
    try {
      const user = new Users(obj);
      await user.save(); // saves obj to data base
      return 'Created';
    } catch (error) {
      throw `Error: ${error}`;
    }
  };
module.exports = {getUsers, createUser}