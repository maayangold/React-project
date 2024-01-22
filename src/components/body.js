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

const Body = () => {
    return <>
       
            <Routes >

                <Route path="/" element={<Entery />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path='/home' element={<Home />} />
                <Route path='/recipes' element={<Recipes />} />
                <Route path='/myRecipes' element={<MyRecipes />} />
                <Route path='/addRcipe' element={<AddRecipe />} />
                <Route path='/notFound' element={<NotFound />} />
                <Route path='/addCategory' element={<AddCategory />} />
                <Route path='/buying' element={<BuyList />} />


            </Routes>
     
    </>
}

export default Body