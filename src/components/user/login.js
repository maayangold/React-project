import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form } from 'semantic-ui-react';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { loginUser } from '../service/serviceUser';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [hasAccount, setHasAccount] = useState(true);

    const schema = yup.object().shape({
        Username: yup.string().required("שדה חובה"),
        Password: yup.string().matches(/^[0-9]{4}$/, 'סיסמא חייבת להכיל 4 ספרות').required("שדה חובה"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(loginUser(data))
            .then(() => {
                navigate(`/home`);
              
            })
            .catch(() => {
                setHasAccount(false);
            });
    };
    
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" ,marginTop:"5%"}}>
            <div style={{ width: "400px", backgroundColor: "#f0f0f0", padding: "50px", borderRadius: "10px" }}>
                <h2 style={{ textAlign: "center" }}>הכנס שם משתמש וסיסמא</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("Username")} placeholder="שם משתמש" style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
                    <p style={{ color: "red", marginBottom: "10px" }}>{errors.Username?.message}</p>

                    <input type="password" {...register("Password")} placeholder="סיסמה" style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
                    <p style={{ color: "red", marginBottom: "10px" }}>{errors.Password?.message}</p>

                    {!hasAccount && (
                        <p style={{ color: "red", marginBottom: "10px" }}>שם משתמש או סיסמה שגויים</p>
                    )}

                    <Button variant="contained" color="primary" size="large" type="submit" style={{ width: "100%" }}>כניסה</Button>

                    {!hasAccount && (
                        <div style={{ marginTop: "10px" }}>
                            <p>עדיין אין לך חשבון?</p>
                            <Link to={'/signUp'} style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                                <IconButton size="small" style={{ marginRight: "5px" }}>
                                    <PersonAdd />
                                </IconButton>
                                הרשם כאן
                            </Link>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default Login;
