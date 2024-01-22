import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCategories } from "./service/serviceCategory";
import { getRecipes } from "./service/serviceRecipe"



export default function Home() {
    const dispatch = useDispatch()  
    dispatch(getRecipes())
    dispatch(getCategories())
    return (
        <>
            <h2>,שלום לך וברוכה הבאה</h2>
            <h3> 😧 אם את בדיאטה הגעת למקום הלא נכון</h3>
        </>)
}