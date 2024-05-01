import React, { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home, ReceiptLong, Favorite, LibraryAdd, DataSaverOn, ShoppingCart, PersonAddDisabled, Person3 } from "@mui/icons-material";
import { useDispatch } from "react-redux";


export default function MainMenu() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        <BottomNavigationAction label="Home" icon={<Home />} onClick={() => { navigate("/home"); setValue(0) }} value={0} />
        <BottomNavigationAction label="Recipes" icon={<ReceiptLong />} onClick={() => { navigate("/recipes"); setValue(1) }} value={1} />
        <BottomNavigationAction label="My Recipes" icon={<Person3 />} onClick={() => { navigate("/myRecipes"); setValue(2) }} value={2} />
        <BottomNavigationAction label="Add Recipe" icon={<LibraryAdd />} onClick={() => {
          dispatch({ type: 'SET_SELECTED_RECIPE', payload: null })
          navigate("/addRecipe"); setValue(3)
        }} value={3} />
        <BottomNavigationAction label="Add Category" icon={<DataSaverOn />} onClick={() => { navigate("/addCategory"); setValue(4) }} value={4} />
        <BottomNavigationAction label="Buy List" icon={<ShoppingCart />} onClick={() => { navigate("/buying"); setValue(5) }} value={5} />
        <BottomNavigationAction label="Switch User" icon={<PersonAddDisabled />} onClick={() => {
          localStorage.removeItem('userData');
          dispatch({ type: "SET_USER", payload: null });
          navigate("/login"); setValue(6)
        }} value={6} />

      </BottomNavigation>
    </div>



  );

}
