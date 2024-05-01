import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField, IconButton } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";
import { addUser } from '../service/serviceUser';
import { ArrowForward } from '@mui/icons-material';
import { useDispatch } from 'react-redux';


const schema = yup
   .object({
      // Id: yup.string("נוננננונונו").required("שדה חובה!"),
      Username: yup.string().required(" שדה חובה"),
      Password: yup.string().matches(/^[0-9]{4}$/, 'סיסמא חייבת להכיל  4 ספרות').required(" שדה חובה"),
      Name: yup.string().required(" שדה חובה"),
      Phone: yup.string().matches(/^[0-9]{7,10}$/, 'טלפון חייב להכיל בין 7 ל-10 ספרות').required(" שדה חובה"),
      // Email: yup.string().email("כתובת המייל אינה תקינה").required(" שדה חובה"),
      Email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'יש להכניס כתובת מייל תקינה').required(" שדה חובה"),
      Tz: yup.string().matches(/^[0-9]{9}$/, 'תעודת זהות חייבת להכיל 9 ספרות בלבד').required(" שדה חובה"),
   }).required()


const SignUp = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   })



   const onSubmit = (data) => {
      dispatch(addUser(data))
      .then(() => {
         navigate(`/home`);
     })
     .catch(() => {
     
  });
};

   return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
         <div style={{ width: "400px", backgroundColor: "#f0f0f0", padding: "50px", borderRadius: "10px" }}>
            <h2 style={{ textAlign: "center" }}>הרשמה למשתמש חדש</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
               <TextField {...register("Username")} label="שם משתמש" />
               <p>{errors.Username?.message}</p>

               <TextField type="password" {...register("Password")} label="סיסמה" />
               <p>{errors.Password?.message}</p>

               <TextField {...register("Name")} label="שם מלא" />
               <p>{errors.Name?.message}</p>

               <TextField {...register("Phone")} label="טלפון" />
               <p>{errors.Phone?.message}</p>

               <TextField {...register("Email")} label="אימייל" />
               <p>{errors.Email?.message}</p>

               <TextField {...register("Tz")} label="תעודת זהות" />
               <p>{errors.Tz?.message}</p>

               <Button variant="contained" color="primary" size="large" type="submit">שמור</Button>
            </form>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
               <p>משתמש רשום?</p>
               <Link to={'/login'} style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconButton size="small" style={{ marginRight: "5px" }}>
                     <ArrowForward />
                  </IconButton>
                  בחזרה להתחברות מחשבון קיים
               </Link>
            </div>
         </div>
      </div>
   );
};

export default SignUp