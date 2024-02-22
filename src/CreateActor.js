import {useState } from "react";
import {useFormik} from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useNavigate } from "react-router-dom";
import * as yup from "yup";
import {API} from "./Global.js";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


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


const actorValidationSchema = yup.object({
 
 Name:yup.string().required(),
 Gender:yup.string().required(),
  Bio:yup.string().required(),
 

});


function CreateActor(){
 
    const [value, setValue] = useState(dayjs(""));

    const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
    initialValues:{
        Name: "",
        Gender : "",
        Bio : ""
    },

    validationSchema:actorValidationSchema,
    
    onSubmit:(newActor)=>{
        newActor.DOB = value.$d
       console.log(newActor)
      addActor(newActor);
     }
  
    })
  
  const navigate =useNavigate()
  const addActor = (newActor) => { 
     
    
   fetch(`${API}/actor/createActor`,{
      method:"POST",
      body:JSON.stringify(newActor),
      headers:{"Content-Type": "application/json"},

     }).then(()=> navigate("/movies"))
     

  } 

    return(
      <form className="smallBox" onSubmit={handleSubmit}>
      <h3>Create Actor</h3>
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
       label="Gender" 
       value={values.Gender}
       name="Gender"
       onChange={handleChange}
       onBlur={handleBlur} 
       error={touched.Gender && errors.Gender}
       helperText={touched.Gender && errors.Gender ? errors.Gender : null}/> 

     <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="DOB"
          name="DOB"
          onChange={(newValue) => setValue(newValue)}
          value={value}
        
        />
      </LocalizationProvider>
               
      <TextField 
      label="Bio" 
      value={values.Bio}
       name="Bio"
       onChange={handleChange}
       onBlur={handleBlur}
       error={touched.Bio && errors.Bio }
       helperText={touched.Bio && errors.Bio ? errors.Bio : null}
    />
          
     <Button variant="contained" type="submit">Create Actor</Button>
        </form>
  
    )
  }
  export default CreateActor ;