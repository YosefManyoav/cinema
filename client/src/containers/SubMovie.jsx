import axios from 'axios'
import React, {useState, useEffect} from 'react'


export default function SubMovie({memberId,load}) {

    const [sub, setSub] = useState([])


    const allSub = async () => {
        const {data, status} = await axios.get(`http://localhost:5000/subscriptions/member/${memberId}`)
    
    if(status === 200 ){
        // return data[0].moviesWatch
        setSub(data)
       }else{
console.log('ריק');
       }

    }
    
useEffect(() => {
    allSub()  
}, [load])



  return (
    <div>
       {sub.length >0 && sub[0].moviesWatch?.map((res, i) => {
        return(
            <div key={i}>

               <h6>{res?.movieId.Name}</h6>
            </div>
        )
       })}
    </div>
  )
}
