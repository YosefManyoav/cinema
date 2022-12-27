import axios from 'axios'
import React, {useState} from 'react'
import { useEffect } from 'react'
import SubMovie from './SubMovie'
import AddMovie from './AddMovieToMember'
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



export default function Members() {
    const navigate = useNavigate();
    const [members, setMembers] = useState([])
    const [movies, setMovies] = useState([])
    const [load, setLoad] = useState(0)

    const allMembers = async () =>{
        const {data} = await axios.get("http://localhost:5000/members")
        setMembers(data)
        // console.log(members);

    } 
    const fun = (num)=>{
      setLoad(num + load)
      console.log(num+load);
    }

    const allMovie = async () => {
      const {data} = await axios.get(`http://localhost:5000/movies`)
      setMovies(data)
// console.log(data)
  }

    useEffect(() =>{
     allMembers()
     allMovie()
    },[])
  return (
    <div>
             <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Avatar src="/broken-image.jpg" 
          onClick={() => navigate("/cinema")}/>
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
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent:"center" }}>
      {members?.map((res, i) => {
          return (
            <div key={i} style={{ margin: "10px", width: "330px"}}>
              <div>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.success"
                      gutterBottom
                    >
                      <h3>{res.Name}</h3>
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {res.Email}
                    </Typography>
                    <Typography variant="body2">
                    </Typography>
                  </CardContent> 
                    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <AddMovie  memberId={res._id} movies={movies} fun={fun}/>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <SubMovie load={load}  memberId={res._id}/>
          </Typography>
        </AccordionDetails>
      </Accordion>

                </Card>
                
              </div>
            </div>
          );
        })}
      </div>
      {/* {members?.map((res, i) => {
        return(
          <div key={i}>
            <h4>{res.Name}</h4>
            <h4>{res.Email}</h4>
            <SubMovie load={load}  memberId={res._id}/>
            <AddMovie  memberId={res._id} movies={movies} fun={fun}/>
          </div>
        )
      })} */}
  
    </div>
  )
}
