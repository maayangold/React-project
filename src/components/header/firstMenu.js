import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginOutlined, PersonAddAltOutlined } from "@mui/icons-material";

export default function FirstMenu() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const iconStyle = { fontSize: "35px" }; 

    return (
        <div style={{ backgroundColor: "#bdaeae", padding: "20px" }}> 
            <BottomNavigation 
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                style={{ backgroundColor: "transparent"}}
            >
                <BottomNavigationAction label="התחברות" icon={<LoginOutlined style={iconStyle} />} onClick={() => { navigate("/login"); setValue(1) }} value={1} />
                <BottomNavigationAction label="הרשמה למשתמש חדש" icon={<PersonAddAltOutlined style={iconStyle} />} onClick={() => { navigate("/signUp"); setValue(2) }} value={2} />
            </BottomNavigation>
        </div>
    );
}
