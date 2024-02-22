import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";
import "font-awesome/css/font-awesome.css"
import IconButton from '@mui/material/IconButton';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';





 function Movie({movie,id,deleteButton,editButton}) {
 //the above movie & id,deleteMovie are received from MovieList componenet
 
 
     let [state,setState]=useState("true")
     const navigate=useNavigate()

     let role = localStorage.getItem("Role")

  return (
     <Card className="box">
         <img className="banner" src={movie.Poster.url}/>
      <CardContent> 
  <div className="cardbody">
       <h5 className="title">{movie.Name} <IconButton  onClick={()=>setState(!state)} aria-label="toggle">
      { state ? <ExpandLessIcon color="primary"/>:<ExpandMoreIcon color="primary"/>}
      </IconButton>
       <IconButton color="primary" onClick={()=>navigate(`/movie/${id}`)}><InfoIcon/>
      </IconButton>
      </h5> 
    </div>
   
      {state ? <p className="discription">{movie.Plot.substring(0,160)}...</p>:null } 
   </CardContent>
      <CardActions>
      {/* render props pattern -i.e:we send a jsx as props[from MovieList componenet to this componenet],and it renderd in child componenet*/}
      {role == 1 ? [editButton,deleteButton] : null} 
      </CardActions>
  </Card>
  )
}

export default Movie;