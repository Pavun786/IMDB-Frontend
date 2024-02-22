import { useState,useEffect } from "react";
import {useFormik} from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate,useParams } from "react-router-dom";
import * as yup from "yup";
import {API} from "./Global.js";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';



const movieValidationSchema = yup.object({
  Poster:yup.string().required(),
 Year_of_Release : yup.number().required(),
 Name:yup.string().required(),
 Plot:yup.string().required().min(20),
 Trailer:yup.string().required().min(4),
 Actors:yup.array().required().min(0).max(10),
 Producer : yup.string().required()

});

function EditMovie(){
     
    const {id} = useParams();
    const[movie,setMovie]=useState(null)
  
    useEffect(()=>{
        fetch(`${API}/movie/${id}`,{
        method:"GET",
        })
       .then((data)=>data.json())
       .then((mv)=>setMovie(mv))
    },[])
 
  return(
    <div>
        {/* here table came befor than data..its not correctway.so,we set a conditional rendering */}
       { movie ? <EditMovieForm movie={movie}/>:"Loading..."}
    </div>
 )
 
  
}
  function EditMovieForm({movie}){ 

    console.log("movie",movie)
    const [producers,setProducers]= useState([])
    const [names,setNames] = useState([])

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
     PaperProps: {
       style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
    },
  },
};

    let res = movie.Actors.map((ele)=> ele.Name)




  const {handleSubmit,values,handleChange,handleBlur,touched,errors,setFieldValue} = useFormik({
    initialValues:{
      Name: movie.Name,
      Year_of_Release:movie.Year_of_Release,
      Plot : movie.Plot,
      Trailer:movie.Trailer,
      Poster: movie.Poster.url,
      Actors: res ? res : [],
      Producer: movie.Producer.Name
    },

    validationSchema:movieValidationSchema,
    
    onSubmit:(updateMovie)=>{

       console.log(updateMovie)

       let res = updateMovie.Actors
      
       const filterIds = names.filter((obj)=> res.includes(obj.Name)).map(obj => obj._id)

       updateMovie.Actors=filterIds

       let res2 = updateMovie.Producer

       const filterProducerIds = producers.filter((obj)=> obj.Name == res2 ).map((val)=> val._id)

       updateMovie.Producer = filterProducerIds[0]


      console.log("Form values: ",updateMovie)
     
      editMovie(updateMovie);
     }
  
  })

  
  const getAllActors = ()=>{
        
        fetch(`${API}/actor/allActors`,{
           method : "GET"
         }).then((dt)=> dt.json())
           .then((val)=> setNames(val))
 
  }
  
  
  const getAllProducers = ()=>{
    
        fetch(`${API}/producer/allProducers`,{
          method : "GET"
        }).then((dt)=> dt.json())
       .then((val)=> setProducers(val.map((ele)=>ele)))
 
   }
  

  useEffect(()=>{
     getAllActors()
     getAllProducers()
  },[])

 


    const navigate =useNavigate()
 
//  This is function,its trigger by onclick event   
    
    const editMovie = (updateMovie) => { 
  
    console.log(updateMovie)
    
    fetch(`${API}/movie/${movie._id}`,{
      method:"PUT",
      body:JSON.stringify(updateMovie),
      headers:{"Content-Type": "application/json"},

     }).then(()=> navigate("/movies"))

    }
    
    return(
      <form className="smallBox" onSubmit={handleSubmit}>
          
          <TextField 
       label="Name"
       value={values.Name}
       name="Name"
       onChange={handleChange}
       onBlur={handleBlur}
       error={touched.Name && errors.Name} 
       helperText={touched.Name && errors.Name ? errors.Name : null}
      /> 


     <TextField 
       label="Year_of_Release"
       value={values.Year_of_Release}
       name="Year_of_Release"
       onChange={handleChange}
       onBlur={handleBlur}
       error={touched.Year_of_Release && errors.Year_of_Release} 
       helperText={touched.Year_of_Release && errors.Year_of_Release ? errors.Year_of_Release : null}
      /> 


     
        <TextField
       label="Plot" 
       value={values.Plot}
       name="Plot"
       onChange={handleChange}
       onBlur={handleBlur} 
       error={touched.Plot && errors.Plot}
       helperText={touched.Plot && errors.Plot ? errors.Plot : null}/> 


               
      <TextField 
      label="Trailer" 
      value={values.Trailer}
       name="Trailer"
       onChange={handleChange}
       onBlur={handleBlur}
       error={touched.Trailer && errors.Trailer }
       helperText={touched.Trailer && errors.Trailer ? errors.Trailer : null}
    />
          
      <TextField  
      label="Poster"
      value={values.Poster}
       name="Poster"
       onChange={handleChange}
       onBlur={handleBlur} 
       //here error & helpertext attribute are Meterial UI feature word..
       //Inside of {...} is error message handle by formik
       error={touched.Poster && errors.Poster}
       helperText={touched.Poster && errors.Poster ? errors.Poster : null}/>



    <InputLabel id="demo-multiple-checkbox-label">Select Actors</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={values.Actors}
          onChange={(event) => setFieldValue('Actors', event.target.value)}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem  value={name.Name}>
              <Checkbox checked={values.Actors.indexOf(name.Name) > -1} />
              <ListItemText primary={name.Name}  />
            </MenuItem>
          ))}
        </Select>

        <FormLabel id="demo-radio-buttons-group-label">Producer</FormLabel>
        <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={values.Producer}
        name="Producer"
        onChange={handleChange}
       >
       {producers.map((ele)=> <FormControlLabel key={ele.Name} value={ele.Name} control={<Radio />} label={ele.Name} /> )}

        
      </RadioGroup>
     
     
       <Button variant="contained" type="submit">Submit</Button>
        </form>
  
    )
  }
  export default EditMovie ;