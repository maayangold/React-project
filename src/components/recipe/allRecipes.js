import * as React from 'react';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { deleteRecipe, getRecipes } from '../service/serviceRecipe';
import { addBuying } from '../service/serviceBuying';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';

export default function AllRecipes() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.user.Id)
    const categories = useSelector(state => state.categories.categories)
    const recipes = useSelector(state => state.recipes.recipes)
    const [expandedMap, setExpandedMap] = React.useState({});
    const navigate = useNavigate()
    const [selectCategory, setSelectCategory] = useState(0);
    const [level, setLevel] = useState(0);
    const [time, setTime] = useState(0);


    const handleExpandClick = (recipeId) => {
        setExpandedMap((prev) => ({
            ...prev,
            [recipeId]: !prev[recipeId],

        }));
    };

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));
    const Update = (recipe) => {

        dispatch({ type: 'SET_SELECTED_RECIPE', payload: recipe });
        navigate('/addRcipe')
    }
    const Delete = (recipe) => {
        dispatch(deleteRecipe(recipe))
    }
    return (

        <div>
            <h4 style={{ fontSize: "25px" }}>כל המתכונים  </h4>
            <div >
                <select className="sel" onChange={(e) => setSelectCategory(e.target.value)}>
                    <option value="0">כל המתכונים</option>
                    {categories.map((x) => <option key={x.Id} value={x.Id}> {x.Name} </option>)}
                </select>

                <select className="sel" name="difficulty" id="difficulty" onChange={(e) => setLevel(e.target.value)}>
                    <option key="0" value="0">כל הרמות</option>
                    <option key="1" value="1">קל</option>
                    <option key="2" value="2"> בינוני</option>
                    <option key="3" value="3"> קשה</option>
                </select>

                <select className="sel" name="selectDuration" onChange={(e) => setTime(e.target.value)}>
                    <option key="0" value="0" >משך הכנה</option>
                    <option key="3" value="10"> דקות 10 </option>
                    <option key="2" value="15"> 15 דקות </option>
                    <option key="4" value="30"> חצי שעה </option>
                    <option key="5" value="60"> שעה </option>
                </select>
            </div>
            <div className='tbl'>
                {recipes?.map((recipe) => (
                    (selectCategory == 0 || selectCategory == recipe.CategoryId) &&
                        (level == 0 || level == recipe.Difficulty) &&
                        (time == 0 || time == recipe.Duration) ? (
                        <Card key={recipe.Id} sx={{ maxWidth: 345, marginBottom: '20px' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                                        {userId == (recipe?.UserId) ?

                                            <PersonOutlineOutlinedIcon />
                                            : <LocalDiningOutlinedIcon />}

                                    </Avatar>
                                }
                                title={recipe.Name}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={recipe.Img}
                                alt="image not defined"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {recipe.Description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <ExpandMore
                                    expand={expandedMap[recipe.Id]}
                                    onClick={() => handleExpandClick(recipe.Id)}
                                    aria-expanded={expandedMap[recipe.Id]}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expandedMap[recipe.Id]} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>:מצרכים</Typography>
                                    {recipe.Ingrident?.map((ing) => (
                                        <Typography paragraph className='direction' key={ing.Name}>
                                            <Checkbox onClick={(e) => {
                                                const isChecked = e.target.checked;
                                                if (isChecked) {

                                                    dispatch(addBuying({ UserId: userId, Name: ing.Name, Count: ing.Count }))
                                                }

                                            }} />
                                            {ing.Count + ' ' + ing.Type + ' ' + ing.Name}
                                        </Typography>
                                    ))}
                                    <Typography paragraph>:הוראות</Typography>
                                    <Typography paragraph>
                                        {recipe?.Instructions}
                                    </Typography>

                                </CardContent>
                            </Collapse>
                            <div>
                                {userId == (recipe?.UserId) ?
                                    <div>
                                        <Button variant="outlined" color="secondary" onClick={() => Delete(recipe)}>מחיקה</Button>
                                        <Button variant="outlined" color="secondary" onClick={() => Update(recipe)}>עריכה</Button>
                                    </div> : <></>}

                            </div>
                            <Button variant="outlined" color="secondary"onClick={() => window.print()} >הדפס מתכון </Button>
                        </Card>

                    ) : null))}
            </div>
        </div>
    );
};