import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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



export default function HomePage() {

  const navigate = useNavigate();
  const[user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value} = e.target
    setUser({
      ...user, [name] : value
    })
  }
  // console.log(user);
  
  const login = async () => {
    const {data} = await axios.get(" http://localhost:5000/connect")
    data.map(res => {
      if(res.email === user.email && res.password === user.password) {
        navigate("/cinema")
      }
    })
  }

  return (
    <div >
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
      <TextField id="outlined-basic" label="email" variant="outlined" type={"text"} name= "email" value={user.email} onChange={handleChange} /><br/>
      <TextField id="outlined-basic" label="password" variant="outlined" type={"password"} name= "password" value={user.password} onChange={handleChange} />
    </Box>
      </CardContent>
      <CardActions>
      <Stack spacing={2} direction="row">
    <Button variant="contained" onClick={() => login("/cinema")}>LOG IN</Button>
    <Button variant="contained"  onClick={() => navigate("/singUp")}>SING UP</Button>
    </Stack>
      </CardActions>
    </Card>
    </div>
    </div>
  )
}
