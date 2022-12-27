const Members = require('../MODEL/membersModel')
const DALMembers = require('../DAL/members')

const getDbMembers = async () => {
    const membersCol = await Members.find({})
    return membersCol.slice(0,9)
    // if( membersCol.length > 0){
    //     return membersCol
    // }else{
    //     const res = await DALMembers.getMembers()
    //     let data = res.data
    //     try{
    //        const membersArr = data.map( members => {
    //            const obj ={
    //             Name : members.name,
    //             Premiered : members.premiered,
    //             Email : members.email
    //            }
    //            return obj
    //         })
    //         membersArr.forEach( async members => {
    //             const membersModel = new Members(members)
    //             await membersModel.save()
    //         })
    //         return membersArr
    //     }catch(error) {
    //         return `error`
    //     }
    // }
}

module.exports = {getDbMembers}