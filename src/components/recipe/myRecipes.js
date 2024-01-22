import * as React from 'react';
import { useEffect, useState } from "react";
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { addBuying, deleteBuying } from '../service/serviceBuying';


export default function MyRecipes() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)

    const recipes = useSelector(state => state.recipes.recipes)
    const selectedRecipe = useSelector(state => state.recipes.selectedRecipe)
    const [expandedMap, setExpandedMap] = React.useState({});
    const navigate = useNavigate()

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
    const deleteRecipe = (id) => {
        dispatch(deleteRecipe(selectedRecipe.Id))
    }
    const Update = (recipe) => {

        dispatch({ type: 'SET_SELECTED_RECIPE', payload: recipe });
        navigate('/addRcipe')
    }
    const Delete = (recipe) => {
        dispatch(deleteRecipe(recipe))
    }
    return (

        <div>
            <h4 style={{ fontSize: "25px" }}>המתכונים של {user.Name}</h4>
            <div className='tbl'>
                {recipes?.map((recipe) =>
                    (user.Id == recipe.UserId) ? (
                        <Card key={recipe.Id} sx={{ maxWidth: 345, marginBottom: '20px' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">

                                        <PersonOutlineOutlinedIcon />

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

                                                    dispatch(addBuying({ userId: user.Id, name: ing.Name, count: ing.Count }))
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
                            <Button variant="outlined" color="secondary" onClick={() => Delete(recipe)}>מחיקה</Button>
                            <Button variant="outlined" color="secondary" onClick={() => Update(recipe)}>עריכה</Button>

                            </div>
                            <Button variant="outlined" color="secondary" onClick={() => window.print()} >הדפס מתכון </Button>
                        </Card>

                    ) : null)}
            </div>
        </div>
    );
};
