import React, { useState } from 'react';
import { Typography, Grid, Checkbox, Button, Icon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addBuying } from '../service/serviceBuying';
import { useLocation, useNavigate } from 'react-router-dom';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Print } from '@mui/icons-material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
const RecipeDetails = () => {

    const location = useLocation();
    const { recipe } = location.state;
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const [buyList, setBuyList] = useState([]);

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.Id === categoryId);
        return category ? category.Name : '';
    };

    const convertDurationToHours = (duration) => {
        if (duration >= 60) {
            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;
            if (minutes > 0)
                return `${hours} שעות ${minutes} דקות`;
            else
                return `${hours} שעות `;
        }
        return `${duration} דקות`;
    };

    const handleCheckboxChange = async (ing) => {
        try {
            const isAlreadyChecked = buyList.some(item => item.Name === ing.Name);
            if (!isAlreadyChecked) {
                await dispatch(addBuying({ UserId: user.Id, Name: ing.Name, Count: 1 }));
                setBuyList([...buyList, ing]);
            } else {
                const updatedBuyList = buyList.filter(item => item.Name !== ing.Name);
                setBuyList(updatedBuyList);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>

            <div style={{ marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                    {recipe.Name}
                </Typography>
                <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
                   {recipe.Description} <AutoAwesomeIcon /> 
                </Typography>
                <Typography variant="body1" style={{ textAlign: 'right' }}>
                    <RestaurantIcon /> קטגוריה: {getCategoryName(recipe.CategoryId)}
                </Typography>
                <Typography variant="body1" style={{ textAlign: 'right' }}>
                    <AccessAlarmIcon /> משך הכנה: {convertDurationToHours(recipe.Duration)}
                </Typography>
                <Typography variant="body1" style={{ textAlign: 'right' }}>
                    <SignalCellularAltIcon /> רמת קושי: {recipe.Difficulty}
                </Typography>
                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                    <img src={recipe.Img} alt="Recipe" style={{ width: '50%', borderRadius: '10px' }} />
                </div>
            </div>

            <Typography variant="h5" gutterBottom style={{ textAlign: 'right' }}>
                <Icon>{recipe.Icon}</Icon> מצרכים
            </Typography>
            <div style={{ textAlign: 'right' }}>
                <Grid container spacing={2}>
                    {recipe.Ingridents.map((ing, index) => (
                        <Grid item xs={12} key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                                checked={false}
                                onChange={() => handleCheckboxChange(ing)}
                            />
                            <Typography variant="body1">
                                <Icon>{ing.Icon}</Icon> {ing.Count} {ing.Type} {ing.Name}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </div>

            <Typography variant="h5" gutterBottom style={{ textAlign: 'right', marginTop: '20px' }}>
                <Icon>{recipe.Icon}</Icon> הוראות הכנה
            </Typography>
            <ol style={{ textAlign: 'right' }}>
                {recipe.Instructions.map((instruction, index) => (
                    <li key={index}><Icon>{recipe.Icon}</Icon> {instruction}</li>
                ))}
            </ol>

            <Button variant="contained" color="warning" onClick={() => window.print()}>
                <Print />הדפס מתכון
            </Button>
        </div>
    );
};

export default RecipeDetails;
