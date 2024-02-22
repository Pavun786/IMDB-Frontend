import { useEffect, useState } from "react";
import {useFormik} from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate,useParams } from "react-router-dom";
import * as yup from "yup";
import {API} from "./Global.js";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';


dayjs.extend(customParseFormat);
dayjs.extend(utc);


function EditProducer(){

    const [getProducer,setGetProducer] = useState("")
    const {id} = useParams()

    useEffect(()=>{
      fetch(`${API}/producer/${id}`,{
        method : "GET"
      }).then((dt)=> dt.json())
      .then((val)=> setGetProducer(val))
    },[])

    
    return(
        <div>
        {getProducer ? <EditProducerForm getProducer={getProducer}/> : "Loading..."}
        </div>
    )
}

function EditProducerForm({getProducer}){

    const [date, setDate] = useState(dayjs(getProducer.DOB));
    
    const producerValidationSchema = yup.object({
 
        Name:yup.string().required(),
        Gender:yup.string().required(),
        Bio:yup.string().required(),
        
       
       });

    const {handleSubmit,values,handleChange,handleBlur,touched,errors,setFieldValue} = useFormik({
        initialValues:{
            Name: getProducer.Name,
            Gender : getProducer.Gender,
            Bio : getProducer.Bio
        },
    
        validationSchema:producerValidationSchema,
        
        onSubmit:(editProducer)=>{
    
           editProducer.DOB = date

           console.log(editProducer)

          addProducer(editProducer);
         }
      
      })
      
       const navigate =useNavigate()
    
       const addProducer = (editProducer) => { 
         
         fetch(`${API}/actor/${getProducer._id}`,{
          method:"PUT",
          body:JSON.stringify(editProducer),
          headers:{"Content-Type": "application/json"},
    
         }).then(()=> navigate("/movies"))
         
    
      } 
    return(
        <form className="smallBox" onSubmit={handleSubmit}>
        <h3>Edit Producer</h3>
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
            onChange={(newValue) => setDate(newValue)}
           value={date}
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
            
       <Button variant="contained" type="submit">Submit</Button>
   </form>
    
    )
}

export default EditProducer;