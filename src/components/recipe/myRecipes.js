import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Button, Typography, Avatar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { blue } from '@mui/material/colors';
import { CakeOutlined as CakeOutlinedIcon, PersonOutlineOutlined as PersonOutlineOutlinedIcon, LocalDiningOutlined as LocalDiningOutlinedIcon } from '@mui/icons-material';
import { deleteRecipe, getRecipes } from '../service/serviceRecipe';
import { getCategories } from '../service/serviceCategory';

const MyRecipes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const userId = user ? user.Id : null; // Ensure user object exists before accessing Id property
    const categories = useSelector(state => state.categories.categories);
    const recipes = useSelector(state => state.recipes.recipes);
    const [selectCategory, setSelectCategory] = useState(0);
    const [level, setLevel] = useState(0);
    const [time, setTime] = useState(0);


    const handleDelete = (recipe) => {
        dispatch(deleteRecipe(recipe));
    };

    const handleUpdate = (recipe) => {
        dispatch({ type: 'SET_SELECTED_RECIPE', payload: recipe });
        navigate('/addRecipe');
    };

    const handleShowDetails = (recipe) => {
        navigate(`/recipe/${recipe.Id}`, { state: { recipe } });
    };


    const renderRecipeActions = (recipe) => {
        if (userId === recipe?.UserId) {
            return (
                <div>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(recipe)}>מחיקה</Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleUpdate(recipe)}>עריכה</Button>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="tbl">
            {recipes?.length > 0 ? (
                recipes.map((recipe) => (
                    (user.Id == recipe.UserId)? (
                        <Card key={recipe.Id} sx={{ width: "400px", marginBottom: '20px' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                                        {userId === recipe?.UserId ?
                                            <PersonOutlineOutlinedIcon /> :
                                            <LocalDiningOutlinedIcon />}
                                    </Avatar>
                                }
                                title={recipe.Name}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={recipe.Img}
                                alt="image not defined"
                                onClick={() => handleShowDetails(recipe)}
                                className="recipe-img" // Add a class name for styling
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {recipe.Description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                {renderRecipeActions(recipe)}
                                <Button variant="outlined" color="secondary" onClick={() => handleShowDetails(recipe)}>להדפסת המתכון</Button>
                            </CardActions>
                        </Card>
                    ) : null
                ))
            ) : (
                <div>
                    <Typography variant="body1" color="text.secondary">
                        אין לך עדיין מתכונים, הוסף מתכונים עכשיו!
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate('/addRecipe')}>
                        הוסף מתכון חדש
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MyRecipes;