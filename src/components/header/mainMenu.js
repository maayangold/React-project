

import React from 'react'
import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";


export default function MainMenu() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate()
  return (
    <div>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="דף הבית" icon={<Home />} onClick={() => { navigate("/home"); setValue(0) }} value={0} />
        <BottomNavigationAction label="מתכונים" icon={<ReceiptLongIcon />} onClick={() => { navigate("/recipes"); setValue(1) }} value={1} />
        <BottomNavigationAction label="המתכונים שלי" icon={<FavoriteIcon />} onClick={() => { navigate("/myRecipes"); setValue(2) }} value={2} />
        <BottomNavigationAction label="הוספת מתכון" icon={<LibraryAddIcon />} onClick={() => { navigate("/addRcipe"); setValue(3) }} value={3} />
        <BottomNavigationAction label="הוספת קטגוריה" icon={<DataSaverOnIcon />} onClick={() => { navigate("/addCategory"); setValue(4) }} value={4} />
        <BottomNavigationAction label="רשימת קניות" icon={<ShoppingCartIcon />} onClick={() => { navigate("/buying"); setValue(5) }} value={5} />
        <BottomNavigationAction label="החלף משתמש " icon={<PersonAddDisabledIcon />} onClick={() => { navigate("/login"); setValue(6) }} value={6} />
      </BottomNavigation>

    </div>


  );
}
