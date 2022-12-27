import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'


export default function AddMovieToMember(props) {
    const [movie, setMovie] = useState([])
    const [movieName, setMovieName] = useState([])
    const [idMovie, setIdMovie] = useState ({
        movieId: ""
    })


    const handleChange = (e) => {
        const {name, value} = e.target
        setIdMovie({
            ...idMovie, [name] : value
        })
    }
      const addMovie = async (obj) => {
      const { data } = await axios.put(`http://localhost:5000/subscriptions/${props.memberId}`,obj)
      setMovieName(data)
    }
    useEffect(() => {
        setMovie(props.movies)
    }, [props.movies.length])
    

  return (
    <div>
        <select name= "movieId" onChange={handleChange}>
    {movie.map((res, i) => {
        return(
             <option key={res._id} value={res._id}>{res.Name}</option>
        )
    })}
        </select>
     <button onClick={() =>{ addMovie(idMovie); props.fun(1)} } >ADD</button>
    </div>
  )
}
