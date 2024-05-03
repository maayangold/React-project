import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Button, Typography, Avatar } from '@mui/material';
import { blue } from '@mui/material/colors';
import { PersonOutlineOutlined as PersonOutlineOutlinedIcon, LocalDiningOutlined as LocalDiningOutlinedIcon } from '@mui/icons-material';
import { deleteRecipe } from '../service/serviceRecipe';

const MyRecipes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const userId = user ? user.Id : null;
    const recipes = useSelector(state => state.recipes.recipes);



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

    return (
        <div className="tbl">
            {recipes?.length > 0 ? (
                recipes.map((recipe) => (
                    (user.Id == recipe.UserId) ? (
                        <Card key={recipe.Id} sx={{ width: "400px", marginBottom: '20px' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                                        {userId === recipe?.UserId ?
                                            <PersonOutlineOutlinedIcon /> :
                                            <LocalDiningOutlinedIcon />}
                                    </Avatar>
                                }
                                title={
                                    <Typography variant="h5" style={{ fontFamily: "Arial, sans-serif", color: "coral" }}>
                                        {recipe.Name}
                                    </Typography>
                                }
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
                                <Typography variant="body1" color="text.secondary">
                                    {recipe.Description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button variant="contained" color="error" onClick={() => handleDelete(recipe)}>מחיקה</Button>
                                <Button variant="contained" color="info" onClick={() => handleUpdate(recipe)}>עריכה</Button>
                                <Button variant="contained" color="warning" onClick={() => handleShowDetails(recipe)}>להדפסת המתכון</Button>
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