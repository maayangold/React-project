import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addRecipe, editRecipe } from "../service/serviceRecipe"
import { Grid, TextField, Select, MenuItem, Button, Typography, Slider, FormHelperText } from '@mui/material';

export default function AddRecipe() {
    const schema = yup.object({
        CategoryId: yup.number().integer().required().min(1, "חובה לבחור קטגוריה"),
        Name: yup.string().required("חובה להכניס שם"),
        Img: yup.string().required("חובה להכניס קישור לתמונה"),
        Duration: yup.number("משך זמן צריך להיותר מספר").positive("משך זמן צריך להיות ערך חיובי").required("חובה להכניס משך זמן"),
        Difficulty: yup.number().integer().positive().required("חובה לבחור רמת קושי"),
        Description: yup.string().required("חובה להכניס תיאור"),

        Ingridents: yup.array().of(
            yup.object().shape({
                Name: yup.string().required("הכנס שם"),
                Count: yup.number("כמות מסוג מספר").positive("כמות לא יכולה להיות שלילית").required("הכנס כמות"),
                Type: yup.string().required("הכנס סוג")
            })
        ).min(2, "חובה להכניס לפחות שני מצרכים"),
        Instructions: yup.array().of(yup.string().nonNullable("הכנס הוראה")).min(2, "חובה להכניס לפחות שתי הוראות")
    })

    const user = useSelector(state => state.user.user)
    const categories = useSelector(state => state.categories.categories)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const recipe = useSelector(state => state.recipes.selectedRecipe);
    const { register, control, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), })
    const { fields: Ingridents, append: apppendIngrident, remove: removeIngrident } = useFieldArray({
        control,
        name: "Ingridents",
        defaultValue: [{ Name: '', Count: '', Type: '' }]
    });

    const { fields: Instructions, append: apppendInstruction, remove: removeInstruction } = useFieldArray({
        control,
        name: "Instructions",
        defaultValue: ['']

    });



    useEffect(() => {

        if (!user) {
            navigate('/recipes')

        }
    }, [dispatch]);

    useEffect(() => {
        if (recipe) {
            // Clear existing values in the field arrays before appending new values
            removeIngrident();
            removeInstruction();

            // Initialize default values for Ingridents
            const defaultIngridents = recipe.Ingridents.length > 0 ? recipe.Ingridents : [{ Name: '', Count: '', Type: '' }];
            defaultIngridents.forEach((ing) => apppendIngrident(ing));

            // Initialize default values for Instructions
            const defaultInstructions = recipe.Instructions.length > 0 ? recipe.Instructions : [''];
            defaultInstructions.forEach((ins) => apppendInstruction(ins));
        }
    }, [recipe, apppendIngrident, apppendInstruction, removeIngrident, removeInstruction]);


    const onSubmit = (data) => {
        let recipeToSend = {
            Id: recipe?.Id,
            Name: data.Name, UserId: user.Id, CategoryId: data.CategoryId, Img: data.Img, Duration: data.Duration, Difficulty: data.Difficulty, Description: data.Description,
            Ingridents: data.Ingridents, Instructions: data.Instructions
        }
       console.log(recipeToSend)
        if (!recipe) {
            dispatch(addRecipe(recipeToSend))
        } else {
            dispatch(editRecipe(recipeToSend))
        }
        dispatch({ type: 'SET_SELECTED_RECIPE', payload: null });
        navigate("/recipes");
    }


    return (

        (<div style={{ backgroundColor: "#f0f0f0", padding: "20px", width: "70%", margin: "10%" }}>
            <Typography variant="h4" gutterBottom>הוספת מתכון חדש</Typography>

            <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="שם"
                            {...register("Name")}
                            error={!!errors.Name}
                            helperText={errors.Name?.message}
                            defaultValue={recipe?.Name}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="קישור לתמונה"
                            {...register("Img")}
                            error={!!errors.Img}
                            helperText={errors.Img?.message}
                            defaultValue={recipe?.Img}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="משך זמן (בדקות)"
                            {...register("Duration")}
                            error={!!errors.Duration}
                            helperText={errors.Duration?.message}
                            defaultValue={recipe ? recipe.Duration : 1} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            fullWidth
                            label="רמת קושי (1-10)"
                            {...register("Difficulty")}
                            error={!!errors.Difficulty}
                            helperText={errors.Difficulty?.message}
                            defaultValue={recipe?recipe.Difficulty:1}
                        >
                            {[...Array(10)].map((_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="תיאור"
                            {...register("Description")}
                            error={!!errors.Description}
                            helperText={errors.Description?.message}
                            defaultValue={recipe?.Description}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="h6" gutterBottom>קטגוריה</Typography>

                        <Select

                            label="קטגוריה"
                            {...register("CategoryId")}
                            defaultValue={recipe ? recipe.CategoryId : 0}
                            error={!!errors.CategoryId}
                            helperText={errors.CategoryId?.message}
                        >
                            <MenuItem value={0} disabled>בחר קטגוריה</MenuItem>
                            {categories?.map((category) =>
                                <MenuItem key={category.Id} value={category.Id}>{category.Name}</MenuItem>
                            )}
                        </Select>
                        {errors.CategoryId && (
                            <FormHelperText error>{errors.CategoryId.message}</FormHelperText>
                        )}
                    </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom>מצרכים</Typography>
                {errors.Ingridents && (
                    <Typography color="error" gutterBottom>{errors.Ingridents.message}</Typography>
                )}
                {Ingridents?.map((ing, index) => (
                    <Grid container spacing={2} key={index}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="שם"
                                {...register(`Ingridents[${index}].Name`)}
                                error={!!errors?.Ingridents?.[index]?.Name} // Check for errors in the Name field of the ingredient
                                helperText={errors?.Ingridents?.[index]?.Name && errors?.Ingridents?.[index]?.Name?.message} // Display error message if available
                                defaultValue={ing?.Name}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="כמות"
                                type="number"
                                {...register(`Ingridents[${index}].Count`)}
                                error={!!errors?.Ingridents?.[index]?.Count} // Check for errors in the Count field of the ingredient
                                helperText={errors?.Ingridents?.[index]?.Count && errors?.Ingridents?.[index]?.Count?.message} // Display error message if available
                                defaultValue={ing?.Count}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="מדידה"
                                {...register(`Ingridents[${index}].Type`)}
                                error={!!errors?.Ingridents?.[index]?.Type} // Check for errors in the Type field of the ingredient
                                helperText={errors?.Ingridents?.[index]?.Type && errors?.Ingridents?.[index]?.Type?.message} // Display error message if available
                                defaultValue={ing?.Type}
                            />
                        </Grid>
                    </Grid>
                ))}
                <Button
                    variant="outlined"
                    onClick={() => {
                        apppendIngrident({ Name: null, Count: null, Type: null });
                    }}
                    startIcon={<AddIcon />}
                >
                    הוסף מצרך
                </Button>


                <Button
                    variant="outlined"
                    onClick={() => removeIngrident(Ingridents.length - 1)} // Remove the last ingredient
                    startIcon={<RemoveIcon />}
                    color="error"
                >
                    להסרת מצרך
                </Button>
                {/* Instruction fields */}
                <Typography variant="h6" gutterBottom>הוראות הכנה</Typography>
                {errors.Instructions && (
                    <Typography color="error" gutterBottom>{errors.Instructions.message}</Typography>

                )}

                {Instructions?.map((instruction, index) => (
                    <Grid container spacing={2} key={index}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="הוראה"
                                {...register(`Instructions[${index}]`)}
                                error={!!errors.Instructions}
                                helperText={errors.Instructions && errors.Instructions[index]?.message}
                                defaultValue={instruction.value}
                            />
                        </Grid>
                    </Grid>
                ))}


                <Button
                    variant="outlined"
                    onClick={() => apppendInstruction(null)}
                    startIcon={<AddIcon />}
                >
                    הוסף הוראה
                </Button>

                <Button
                    variant="outlined"
                    onClick={() => removeInstruction(Instructions.length - 1)} // Remove the last instruction
                    startIcon={<RemoveIcon />}
                    color="error"
                >
                    להסרת הוראה
                </Button>

                <br></br>
                <br></br>
                <Button variant="contained" color="primary" size="large" type="submit" style={{ width: "100%" }}>אישור</Button>
            </form>
        </div>)
    );
}



