import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Entery from "./entery"
import Home from "./home"
import NotFound from "./notFound"
import Recipes from "./recipe/allRecipes"
import MyRecipes from "./recipe/myRecipes"
import Login from "./user/login"
import SignUp from "./user/signUp"
import AddRecipe from "./recipe/addRecipe";
import AddCategory from "./category/addCategory";
import BuyList from "./buying/buyList";
import RecipeDetails from "./recipe/recipeDetails";
import { getCategories } from "./service/serviceCategory";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "./service/serviceRecipe";

const Body = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // Check for user data in localStorage when the component mounts
        const storedUser = JSON.parse(localStorage.getItem('userData'));
        if (storedUser) {
            dispatch({ type: 'SET_USER', payload: storedUser });
            dispatch(getRecipes());
            dispatch(getCategories());
        }
    }, [dispatch]);
    return (
        <div className="background">
            <Routes>
                <Route path="/" element={<Entery />} />
                <Route path='/login' element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path='/home' element={<Home />} />
                <Route path='/recipes' element={<Recipes />} />
                <Route path='/addRecipe' element={<AddRecipe />} />
                <Route path='/recipe/:recipeId' element={<RecipeDetails />} />
                <Route path='/myRecipes' element={<MyRecipes />} />
                <Route path='/notFound' element={<NotFound />} />
                <Route path='/addCategory' element={<AddCategory />} />
                <Route path='/buying' element={<BuyList />} />
            </Routes>
        </div>
    );
}

export default Body;
