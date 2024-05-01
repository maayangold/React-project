import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Button, Typography, Avatar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { blue } from '@mui/material/colors';
import { CakeOutlined as CakeOutlinedIcon, PersonOutlineOutlined as PersonOutlineOutlinedIcon, LocalDiningOutlined as LocalDiningOutlinedIcon } from '@mui/icons-material';
import { deleteRecipe, getRecipes } from '../service/serviceRecipe';
import { getCategories } from '../service/serviceCategory';

const AllRecipes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const userId = user ? user.Id : null; // Ensure user object exists before accessing Id property
    const categories = useSelector(state => state.categories.categories);
    const recipes = useSelector(state => state.recipes.recipes);
    const [selectCategory, setSelectCategory] = useState(0);
    const [level, setLevel] = useState(0);
    const [time, setTime] = useState(0);
    useEffect(() => {
        // Check for user data in localStorage when the component mounts
        const storedUser = JSON.parse(localStorage.getItem('userData'));
        if (storedUser) {
            dispatch({ type: 'SET_USER', payload: storedUser });
            dispatch(getRecipes());
            dispatch(getCategories());
        }
    }, [dispatch]);

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
        <div>
            <h4 style={{ fontSize: "35px" }}>כל המתכונים  </h4>
            <div className="select-container">
                <FormControl className="select">
                    <InputLabel id="category-label">בחר קטגוריה</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category-select"
                        value={selectCategory}
                        onChange={(e) => setSelectCategory(e.target.value)}
                    >
                        <MenuItem value={0}>מכל הקטגוריות</MenuItem>
                        {categories.map((x) => <MenuItem key={x.Id} value={x.Id}> {x.Name} </MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl className="select">
                    <InputLabel id="difficulty-label">רמת קושי</InputLabel>
                    <Select
                        labelId="difficulty-label"
                        id="difficulty-select"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <MenuItem value={0}>כל הרמות</MenuItem>
                        <MenuItem value={1}>קל</MenuItem>
                        <MenuItem value={2}>בינוני</MenuItem>
                        <MenuItem value={3}>קשה</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className="select">
                    <InputLabel id="duration-label">משך הכנה</InputLabel>
                    <Select
                        labelId="duration-label"
                        id="duration-select"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    >
                        <MenuItem value={0}>כל זמני ההכנה</MenuItem>
                        <MenuItem value={10}>10 דקות</MenuItem>
                        <MenuItem value={15}>15 דקות</MenuItem>
                        <MenuItem value={30}>חצי שעה</MenuItem>
                        <MenuItem value={60}>שעה</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="tbl">
                {recipes?.map((recipe) => (
                    (selectCategory == 0 || selectCategory == recipe.CategoryId) &&
                        (level == 0 || level == recipe.Difficulty) &&
                        (time == 0 || time >= recipe.Duration) ? (
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
                ))}
            </div>
        </div>
    );
};

export default AllRecipes;
