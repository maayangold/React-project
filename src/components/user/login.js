import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { Form } from 'semantic-ui-react'
import Button from '@mui/material/Button';


const Login = () => {


    const dispatch = useDispatch()
    dispatch({ type: 'SET_USER', pylaod: null })
    const navigate = useNavigate()
    const [hasAcount, setHasAcount] = useState(true)

    const schema = yup.object({
        Username: yup.string().required(" שדה חובה"),
        Password: yup.string().matches(/^[0-9]{4}$/, 'סיסמא חייבת להכיל 4 ספרות').required(" שדה חובה"),
    }).required()


    const {
        register, handleSubmit, formState: { errors }, } = useForm({
            resolver: yupResolver(schema),
        })


    const onSubmit = (data) => {

        axios.post("http://localhost:8080/api/user/login", {
            Username: data.Username,
            Password: data.Password
        })
            .then(res => {

                dispatch({ type: "SET_USER", payload: res.data })
                console.log(res.data)
                navigate(`/home`)
            })
            .catch(err => {
                console.log(err);
                setHasAcount(false);

            })
    }
    return <div style={{ position: "absolute", left: "35%" }}>
        {/* <h1>welcome!!</h1> */}
        <h5>לגישה לאתר עליך להתחבר לחשבון שלך</h5>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <input type="text"{...register("Username")} placeholder="הכנס שם" />
            <p>{errors.Username?.message}</p>

            <input type="password"{...register("Password")} placeholder="הכנס סיסמא" />
            <p>{errors.Password?.message}</p>
            {(!hasAcount) ?
                <div> <label>עדיין אין לך חשבון?👈</label><Link className='link' to={'/signUp'}>לחץ כאן</Link></div>
                : <></>}

            <br />
            <br />
            <Button variant="outlined" color="secondary" size="large" type="submit" className='but' >כניסה</Button>
        </Form>
    </div>
}



export default Login;