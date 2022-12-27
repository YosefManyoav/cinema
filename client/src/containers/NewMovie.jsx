import React from 'react'
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function EditMovie() {

    const navigate = useNavigate()
    const [addMovie, setAddMovie] = useState({
        Name:"",
        Image:"",
        Premiered: "",
        Summary: ""
    })

    const {id} =useParams()
    const handleChange = (e) => {
        const {name, value} = e.target
        setAddMovie({
            ...addMovie, [name] : value
        })
    }

    const addNewMovie = async (obj) => {
        const {data} = await axios.post(`http://localhost:5000/movies`,obj)
        return data
    }
  return (
    <div>
          <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
                Y.M CINEMA
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <div style={{display: "flex",  justifyContent:"center" , marginTop: "60px"}}>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Name" variant="outlined" type={"text"} name= "Name" value={addMovie.Name} onChange={handleChange}/><br/>
      <TextField id="outlined-basic" label="Image" variant="outlined" type={"text"} name= "Image" value={addMovie.Image} onChange={handleChange} /><br/>
      <TextField id="outlined-basic" label="Premiered" variant="outlined" type={"text"} name= "Premiered" value={addMovie.Premiered} onChange={handleChange} /><br/>
      <TextField id="outlined-basic" label="Summary" variant="outlined" type={"text"} name= "Summary" value={addMovie.Summary} onChange={handleChange} />
    </Box>
      </CardContent>
      <CardActions>
      <Stack spacing={2} direction="row">
    <Button variant="contained" onClick={() => addNewMovie(addMovie)}>ADD</Button>
    <Button variant="contained"  onClick={() => navigate(`/cinema`)} >To Movie</Button>
    </Stack>
      </CardActions>
    </Card>
    </div>
    </div>
  )
}

