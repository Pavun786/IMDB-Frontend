import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import { useNavigate,Link} from "react-router-dom";
import * as yup from "yup";
import {API} from "./Global";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const RegisterValidationSchema = yup.object({
    Username:yup.string().required(),
    Email:yup.string().required(),
    Password:yup.string().required(),
    Role : yup.number().required()
       
   });
  export function Register(){
    
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            Username:"",
            Email:"",
            Password:"",
            Role : ""
        },
   
        validationSchema:RegisterValidationSchema,

       onSubmit:async (values)=>{
        console.log(values)
       
        const signup = await fetch(`${API}/auth/register`,{
            method:"POST",
            body:JSON.stringify(values),
            headers:{"Content-type": "application/json"},
      
           })
           if (signup.status === 500) {
            alert(signup.message);
          
          } else
           { 
            const result=await signup.json() 
            console.log(result)
            navigate("/");
           }
       }
    });
     
    return(
        <div >
            <h3 className='register'>Register</h3>
            <form className='register-container'onSubmit={formik.handleSubmit}>
          <TextField id="outlined-basic" 
          label="Username" 
          variant="outlined" 
          value={formik.values.Username}
            onChange={formik.handleChange}
            name="Username"
            onBlur={formik.handleBlur} 
            //here error & helpertext is Meterial UI feature word..
            error={formik.touched.Username && formik.errors.Username}
            helperText={formik.touched.Username && formik.errors.Username ? formik.errors.Username : null}/>

          <TextField id="outlined-basic" 
          label="Email" 
          variant="outlined"
          value={formik.values.Email}
            onChange={formik.handleChange}
            name="Email" 
            onBlur={formik.handleBlur} 
            //here error & helpertext is Meterial UI feature word..
            error={formik.touched.Email && formik.errors.Email}
            helperText={formik.touched.Email && formik.errors.Email ? formik.errors.Email : null}/>

          <TextField id="outlined-basic" 
          label="Password" 
          variant="outlined"
          value={formik.values.Password}
            onChange={formik.handleChange}
            name="Password" 
            onBlur={formik.handleBlur} 
            //here error & helpertext is Meterial UI feature word..
            error={formik.touched.Password && formik.errors.Password}
            helperText={formik.touched.Password && formik.errors.Password ? formik.errors.Password : null}/>

        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.Role}
          label="Role"
          onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldValue('Role', e.target.value);
            }}
          error={formik.touched.Role && formik.errors.Role}
          helperText={formik.touched.Role && formik.errors.Role ? formik.errors.Role : null}
          >
        
          <MenuItem value={1}>Admin</MenuItem>
          <MenuItem value={2}>User</MenuItem>
          
        </Select>


          <Button type="submit" variant="contained">submit</Button>
          
          <p> If you have an account <Link to="/">Click-Here</Link> </p>
     
          </form>
        </div>
    )
 }
 