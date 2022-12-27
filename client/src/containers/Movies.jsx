import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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

export default function Movies() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [movieDeleted, setMovieDeleted] = useState();
  const [filter, setFilter] = useState([])

  const movieFilter = (search) => {
    if(search.length>= 1){
    const filterMovie = movie.filter((mov) =>{
      if(mov.Name.toLocaleLowerCase().includes( search.toLocaleLowerCase())){
        return mov
      }
    })
    setFilter(filterMovie)
  }else if(search.length<= 1) setFilter(movie)
  }
  const allMovies = async () => {
    const { data } = await axios.get("http://localhost:5000/movies");
    setMovie(data);
    setFilter(data)
  };
  const deleteMovies = async (id) => {
    const { data } = await axios.delete(`http://localhost:5000/movies/${id}`);
    setMovieDeleted(data);
  };
  useEffect(() => {
    allMovies();
  }, [movieDeleted]);

  return (
    <div>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Avatar src="/broken-image.jpg" 
          onClick={() => navigate("/members")}/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
             <Stack spacing={2} direction="row">
             <Button variant="contained" onClick={() => navigate("/newMovie")}>ADD MOVIE</Button>
             </Stack>
          </Typography>
          <Search onChange={(e) => {
            movieFilter(e.target.value)
            }}>
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase 
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent:"center" }}>
        {filter.map((res, i) => {
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
                    <Typography variant="h5" component="div">
                      <img src={res.Image} />
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {res.Premiered}
                    </Typography>
                    <Typography variant="body2">
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Box sx={{ "& > :not(style)": { m: 1 } }}>
                      <Fab color="secondary" aria-label="edit">
                        <EditIcon
                          onClick={() => navigate(`/edit/${res._id}`)}
                        />
                      </Fab>
                    </Box>
                    <Tooltip title="Delete">
                      <IconButton>
                        <DeleteIcon onClick={() => deleteMovies(res._id)} />
                      </IconButton>
                    </Tooltip>
                  </CardActions>   <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
                {res.Summary}
          </Typography>
        </AccordionDetails>
      </Accordion>

                </Card>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
