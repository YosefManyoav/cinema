const { find } = require('../MODEL/membersModel');
const Sub = require ('../MODEL/subModel')

const getSub = async () => {
    try{
        return await Sub.find({})
    }catch (error){
        throw `error:${error}`
    }
};

const addSub = async (id) => {
    try {
        const obj ={
            memberId : id,
            moviesWatch : []
        }
        const subscriptions = new Sub(obj)
     await  subscriptions.save()
     return Sub.find({})
    } catch (error) {
        throw `error: ${error}`
    }

}



const memberWatched = async (memberId) => {
    try {
        const movieMember = await Sub.find({memberId}).populate({path:'moviesWatch.movieId', select: "Name"})
        return movieMember
    } catch (error) {
        throw `error:${error}`
    }
}
const movieWatched = async (movieId) => {
    try {
        const movieMember = await Sub.find({"moviesWatch.movieId":movieId}).populate({path: "memberId"}).select("memberId")
        return movieMember
    } catch (error) {
        throw `error:${error}`
    }
}

const addMovie = async (id, idMovie) => {
    try {
    //   await Movies.findByIdAndUpdate(id, obj);
    const test=await Sub.find({memberId: id})
    if (test.length <=0) {
       await addSub(id)
    }
      await Sub.updateOne({memberId: id},{$push:{moviesWatch:{movieId:idMovie,date:Date()}}});
      return Sub.find({});
    } catch (error) {
      throw `Error: ${error}`;
    }
};

module.exports = {getSub, addMovie, movieWatched, memberWatched, addSub}