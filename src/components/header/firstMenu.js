


import React from 'react'
import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { useNavigate } from "react-router-dom";


export default function MainMFirstMenuenu() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate()
    return (
        <div style={{display:"block",position:"absolute",right:"5%"}}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="התחברות" icon={<LoginOutlinedIcon />} onClick={() => { navigate("/login"); setValue(1) }} value={1} />
                <BottomNavigationAction label="הרשמה" icon={< PersonAddAltOutlinedIcon/>} onClick={() => { navigate("/signUp"); setValue(2) }} value={2} />

            </BottomNavigation>

        </div>
    );
}