// import {useState} from "react"
// import { useNavigate,useParams, } from "react-router-dom";
// import { useEffect } from "react";
// import { Button } from "@mui/material";
// import {API} from "./Global.js";


// function MovieDetails(){
   
//     const {id} = useParams();
//     console.log(id)
    
//     const[movie,setMovie]=useState([])
   
   
//     useEffect(()=>{
//        fetch(`${API}/movie/${id}`,{
//         method:"GET",
//        })
//       .then((data)=>data.json())
//       .then((mv)=>setMovie(mv))
//       },[])
    
//       console.log(movie.Trailer)
   
//     let navigate=useNavigate()
  
//     return(
//       <div>
//         <iframe
//          width="100%" 
//          height="850" 
//          src={movie.Trailer}
       
//          frameborder="0" 
//          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
          
//          </iframe>
//          <div className='movie-detail-container'>
//          <div className="cardbody">
         
        
//          <h3>Movie details page of {movie.Name}</h3>
      
//         </div>
//         <p >{movie.Plot}</p>

//         <h4>Star cast : </h4>
//         {movie?.Actors?.map((ele)=>(
//           <Button onClick={()=>navigate(`/actor/${ele._id}`)}>{ele?.Name}</Button>
//         ))}
//         <h4>Producer of the Movie:<Button onClick={()=> navigate(`/producer/${movie.Producer._id}`)}>{movie?.Producer?.Name}</Button></h4>
        
//         <Button startIcon={<keyboardBackspaceIcon />}
//         onClick={()=>navigate(-1)} variant="contained">Back</Button>  
         
//       </div>
     
//      </div>
      
//     )
//   }
// export default MovieDetails;  


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import keyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { API } from "./Global.js";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/movie/${id}`)
      .then((response) => response.json())
      .then((movieData) => setMovie(movieData))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  return (
    <div>
      {movie.Trailer && (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${getVideoIdFromUrl(movie.Trailer)}`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}

      <div className="movie-detail-container">
        <div className="cardbody">
          <h3>Movie details page of {movie.Name}</h3>
        </div>
        <p>{movie.Plot}</p>

        <h4>Star cast:</h4>
        {movie?.Actors?.map((actor) => (
          <Button key={actor._id} onClick={() => navigate(`/actor/${actor._id}`)}>
            {actor?.Name}
          </Button>
        ))}

        <h4>
          Producer of the Movie:
          {movie?.Producer && (
            <Button onClick={() => navigate(`/producer/${movie.Producer._id}`)}>
              {movie.Producer.Name}
            </Button>
          )}
        </h4>

        <Button
          startIcon={<keyboardBackspaceIcon />}
          onClick={() => navigate(-1)}
          variant="contained"
        >
          Back
        </Button>
      </div>
    </div>
  );
}

// Function to extract video ID from YouTube URL
function getVideoIdFromUrl(url) {
  // Check if the URL is a valid YouTube video URL
  const isYouTubeUrl = url.includes("youtube.com") || url.includes("youtu.be");

  if (isYouTubeUrl) {
    // If it's a YouTube URL, try to extract the video ID
    const urlSearchParams = new URLSearchParams(new URL(url).search);
    const videoId = urlSearchParams.get("v") || url.split("/").pop();
    return videoId;
  } else {
    // If it's not a YouTube URL, return an empty string
    return "";
  }
}

export default MovieDetails;
