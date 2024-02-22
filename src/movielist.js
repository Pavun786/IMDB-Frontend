import Movie from "./Moviecard"
import { useState } from "react";
import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import {API} from "./Global.js";
import SlideShow from './SlideShow.js';


function MovieList() {
    
     const[movieList,setMovieList]=useState([])
  
     const getMovies =()=>{
        fetch(`${API}/movie/getAllMovies`)
        .then((data)=>data.json())
        .then((mvs)=>setMovieList(mvs))
    }

     useEffect(()=>getMovies() ,[])
    
     const deleteMovie =(id)=>{
         
      fetch(`${API}/movie/${id}`,{
         method:"DELETE",
      }).then((data)=> getMovies())
    
    }
   
    const navigate =useNavigate();
      
    return (
        
      <div >
        
        <SlideShow movieList={movieList} setMovieList={setMovieList}/> 
        <div className="App">
         { movieList.map((mv)=>(
         <div key={mv._id}>
         <Movie movie={mv} id={mv._id}
         //render props
          deleteButton={
            <IconButton
            onClick={()=> deleteMovie(mv._id)}
            aria-label="delete"
            color="error"
          >
          <DeleteIcon/>
          </IconButton>
         }

         editButton={
            <IconButton
            onClick={()=> navigate(`/movie/edit/${mv._id}`)}
            aria-label="edit"
            color="primary"
          >
          <EditIcon/>
          </IconButton>
         }
          
         />
         </div>
      ))}
      </div>
       </div>
    )
 }

 export default MovieList;
      
  