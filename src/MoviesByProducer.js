import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {API} from "./Global.js"


function MoviesByProducer(){

  const [movieByProducer,setMovieByProducer]= useState("")
  const {id} = useParams()
  const navigate = useNavigate()
  let role = localStorage.getItem("Role")
   

    useEffect(()=>{
        fetch(`${API}/producer/${id}`,{
            method: "GET"
        }).then((dt)=> dt.json())
        .then((mv)=> setMovieByProducer(mv))
    },[])

     console.log(movieByProducer)

     const deleteProducer =(id)=>{
      fetch(`${API}/producer/${id}`,{
        method : "DELETE"
      }).then(()=>navigate("/movies"))
   }  

    return(
     

    <Card sx={{ maxWidth: 345 }}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Producer_Name : {movieByProducer.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
       Gender : {movieByProducer.Gender}
        </Typography>
       
        <Typography variant="body2" color="text.secondary">
       Bio : {movieByProducer.Bio}
        </Typography>
        <Typography variant="body2" color="text.secondary">
       Movies_Produced:{movieByProducer?.Movies?.map((mv)=>{
       return(
        <div>{mv.Name}</div>
       ) 
    })}
        </Typography>
      </CardContent>
    <CardActions>
        {role == 1 ? <Button size="small" onClick={()=>navigate(`/edit/producer/${movieByProducer._id}`)}>Edit</Button> : null}
        {role == 1 ?  <Button size="small" onClick={()=>deleteProducer(`${movieByProducer._id}`)}>Delete</Button> : null}
     </CardActions>
      
    </Card>

   )
}

export default MoviesByProducer;