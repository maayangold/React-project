import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home, ReceiptLong, Favorite, LibraryAdd, DataSaverOn, ShoppingCart, PersonAddDisabled, Person3 } from "@mui/icons-material";
import { useDispatch } from "react-redux";

export default function MainMenu() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const iconStyle = { fontSize: "30px" }; 

  return (
    <div style={{ backgroundColor: "#bdaeae", padding: "20px" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{ backgroundColor: "transparent" }}
      >
        <BottomNavigationAction label="בית" icon={<Home style={iconStyle} />} onClick={() => { navigate("/home"); setValue(0) }} value={0}  />
        <BottomNavigationAction label="כל המתכונים" icon={<ReceiptLong style={iconStyle} />} onClick={() => { navigate("/recipes"); setValue(1) }} value={1}  />
        <BottomNavigationAction label="המתכונים שלי" icon={<Person3 style={iconStyle} />} onClick={() => { navigate("/myRecipes"); setValue(2) }} value={2}  />
        <BottomNavigationAction label="הוספת מתכון חדש" icon={<LibraryAdd style={iconStyle} />} onClick={() => {
          dispatch({ type: 'SET_SELECTED_RECIPE', payload: null })
          navigate("/addRecipe"); setValue(3)
        }} value={3}  />
        <BottomNavigationAction label="הוספת קטגוריה" icon={<DataSaverOn style={iconStyle} />} onClick={() => { navigate("/addCategory"); setValue(4) }} value={4}  />
        <BottomNavigationAction label="עגלת הקנית שלי" icon={<ShoppingCart style={iconStyle} />} onClick={() => { navigate("/buying"); setValue(5) }} value={5}  />
        <BottomNavigationAction label="החלף משתמש" icon={<PersonAddDisabled style={iconStyle} />} onClick={() => {
          localStorage.removeItem('userData');
          dispatch({ type: "SET_USER", payload: null });
          navigate("/login"); setValue(6)
        }} value={6}  />
      </BottomNavigation>
    </div>
  );
}
