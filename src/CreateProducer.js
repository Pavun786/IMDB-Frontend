import { useState } from "react";
import {useFormik} from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
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

const producerValidationSchema = yup.object({
 
 Name:yup.string().required(),
 Gender:yup.string().required(),
 Bio:yup.string().required(),
 

});

function CreateProducer(){
 
    const [value, setValue] = useState(dayjs(""));

    const {handleSubmit,values,handleChange,handleBlur,touched,errors,setFieldValue} = useFormik({
    initialValues:{
        Name: "",
        Gender : "",
        Bio : ""
    },

    validationSchema:producerValidationSchema,
    
    onSubmit:(newProducer)=>{
       newProducer.DOB = value.$d
       addProducer(newProducer);
     }
  
  })
  
   const navigate =useNavigate()
   
   const addProducer = (newProducer) => { 
     
      fetch(`${API}/producer/createProducer`,{
      method:"POST",
      body:JSON.stringify(newProducer),
      headers:{"Content-Type": "application/json"},

     }).then(()=> navigate("/movies"))
     

  } 

    return(
      <form className="smallBox" onSubmit={handleSubmit}>
      <h3>Create Producer</h3>
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
          value={value}
          onChange={(date) => setValue(date)}
         
        />
      </LocalizationProvider>
     {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="DOB"
          value={values.DOB}
          onChange={(date) => setFieldValue('DOB', date)}
          onBlur={handleBlur}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider> */}
               
      <TextField 
      label="Bio" 
      value={values.Bio}
       name="Bio"
       onChange={handleChange}
       onBlur={handleBlur}
       error={touched.Bio && errors.Bio }
       helperText={touched.Bio && errors.Bio ? errors.Bio : null}
    />
          
     <Button variant="contained" type="submit">Create Producer</Button>
        </form>
  
    )
  }
  export default CreateProducer ;