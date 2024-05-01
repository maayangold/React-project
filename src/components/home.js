import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";



export default function Home() {
    const dispatch = useDispatch()


    
    return (
       
        <>
            <h1>Welcome to Our Recipe App</h1>
            <h2>!Explore delicious recipes from around the world</h2>
            <div>
            <div className="movingRecipe"></div>
            </div>
        </>
        )
}