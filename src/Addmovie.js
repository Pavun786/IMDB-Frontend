import { useEffect, useState } from "react";
import {useFormik} from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useNavigate } from "react-router-dom";
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


const movieValidationSchema = yup.object({
 Poster:yup.string().required(),
 Year_of_Release : yup.number().required(),
 Name:yup.string().required(),
 Plot:yup.string().required().min(20),
 Trailer:yup.string().required().min(4),
 Actors:yup.array().required().min(0).max(10),
 Producer : yup.string().required()

});

function AddMovie(){

 
  const [names,setNames] = useState([])
  const [producers,setProducers]= useState([])


  const {handleSubmit,values,handleChange,handleBlur,touched,errors,setFieldValue} = useFormik({
    initialValues:{
        Name: "",
        Year_of_Release:"",
        Plot : "",
        Trailer:"",
        Poster: "",
        Actors: [],
        Producer: ""
    },

    validationSchema:movieValidationSchema,
    
    onSubmit:(newMovie)=>{

      let res = newMovie.Actors
      let res2 = newMovie.Producer

      const filterIds = names.filter((obj)=> res.includes(obj.Name)).map(obj => obj._id)

      const filterProducerIds = producers.filter((obj)=> obj.Name == res2 ).map((val)=> val._id)

       newMovie.Actors = filterIds

       newMovie.Producer = filterProducerIds[0]


      console.log("Form values: ",newMovie)
        addMovie(newMovie);
     }
  
  })

  const getAllActors = ()=>{
    fetch(`${API}/actor/allActors`,{
      method : "GET"
   }).then((dt)=> dt.json())
   .then((val)=> setNames(val.map((ele)=>ele)))
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

    const addMovie = (newMovie) => { 
     
      fetch(`${API}/movie/createMovie`,{
      method:"POST",
      body:JSON.stringify(newMovie),
      headers:{"Content-Type": "application/json"},

     })
     .then(()=> navigate("/movies"))
    

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
            <MenuItem key={name._id} value={name.Name}>
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
     
     
       <Button variant="contained" type="submit">Add Movie</Button>
        </form>
  
    )
  }
  export default AddMovie ;



