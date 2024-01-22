import { Input } from "@mui/base"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, useFieldArray } from 'react-hook-form'
import { Form } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Button from '@mui/material/Button';
import { addRecipe, editRecipe } from "../service/serviceRecipe"
import { Message } from "@mui/icons-material"



export default function AddRecipe() {
    const schema = yup.object({
        CategoryId: yup.number().integer().required().min(1, "חובה לבחור קטגוריה"),
        Name: yup.string().required("חובה להכניס שם"),
        Img: yup.string(),
        Duration: yup.number("משך זמן צריך להיותר מספר").positive("משך זמן לא יכול להיות מספר שלילי").required("חובה להכניס משך זמן"),
        Difficulty: yup.number().integer().positive().required().min(1, "חובה לבחור רמת קושי"),
        Description: yup.string().required("חובה להכניס תיאור"),
        Instructions: yup.array().of(yup.string().required()),
        Ingrident: yup.array().of(
            yup.object().shape({
                Name: yup.string().required("הכנס שם"),
                Count: yup.number("כמות מסוג מספר").positive("כמות לא יכולה להיות שלילית").required("הכנס כמות"),
                Type: yup.string().required("הכנס סוג")
            })
        )
    })

    const userId = useSelector(state => state.user.user.Id)
    const categories = useSelector(state => state.categories.categories)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const recipe = useSelector(state => state.recipes.selectedRecipe);

    const { register, control, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), })

    const { fields: Ingrident, append: apppendIngrident, remove: removeIngrident } = useFieldArray({
        control,// control props comes from useForm (optional: if you are using FormContext)
        name: "Ingrident", // unique name for your Field Array
    });
    const { fields: Instructions, append: apppendInstruction, remove: removeInstruction } = useFieldArray({
        control, name: "Instructions",
    });

    useEffect(() => {
        recipe?.Ingrident?.map((ing) => apppendIngrident(ing))
        recipe?.Instructions?.map((ins) => {
            apppendInstruction(ins)
        })
    }, [recipe]);



    const onSubmit = (data) => {
        let recipeToSend = {
            Id: recipe?.Id,
            Name: data.Name, UserId: userId, CategoryId: data.CategoryId, Img: data.Img, Duration: data.Duration, Difficulty: data.Difficulty, Description: data.Description,
            Ingrident: data.Ingrident, Instructions: data.Instructions
        }



        if (!recipe) {
            dispatch(addRecipe(recipeToSend))

        }

        else {
            dispatch(editRecipe(recipeToSend))
        }
        dispatch({ type: 'SET_SELECTED_RECIPE', payload: null });
        navigate("/home");

    }




    return (<>

        <h4 >הוספת מתכון חדש !  </h4>

        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Input type="text"{...register("Name")} placeholder="הכנס שם" defaultValue={recipe?.Name} />
            <p>{errors.Username?.message}</p>


            <select {...register("CategoryId")} name="CategoryId" defaultValue={recipe ? recipe.CategoryId : 0} >
                <option value={0} disabled>כל המתכונים</option>
                {categories?.map((category) =>
                    <option key={category.Id} value={category.Id}>{category.Name}</option>)}
            </select>
            {errors.CategoryId?.message ? <Message warning content={errors.CategoryId.message} /> : <></>}

            <Input type="number" {...register("Difficulty")} placeholder="הכנס רמת קושי" defaultValue={recipe?.Difficulty} />
            <p>{errors.Difficulty?.message}</p>

            <Input type="number" {...register("Duration")} placeholder="הכנס משך הכנה בדקות" defaultValue={recipe?.Duration} />
            <p>{errors.Duration?.message}</p>

            <Input type="text" {...register("Description")} placeholder="  תיאור של המתכון" defaultValue={recipe?.Description} />
            <p>{errors.Description?.message}</p>

            <Input type="text" {...register("Img")} placeholder="הכנס  קישור לתמונה" defaultValue={recipe?.Img} />
            <p>{errors.Img?.message}</p>


            <div>
                {Ingrident?.map((ingrident, index) => (

                    <div key={ingrident.id}>
                        <Input placeholder="שם" {...register(`Ingrident.${index}.Name`)} defaultValue={ingrident?.Name} />
                        <p>{errors[`Ingrident.${index}.Name`]?.message}</p>

                        <Input type="number" placeholder="כמות"{...register(`Ingrident.${index}.Count`)} defaultValue={ingrident?.Count} />
                        <p>{errors[`Ingrident.${index}.Count`]?.message}</p>

                        <Input placeholder="סוג" {...register(`Ingrident.${index}.Type`)} defaultValue={ingrident?.Type} />
                        <p>{errors[`Ingrident.${index}.Type`]?.message}</p>


                    </div>))}


            </div>

            <Button variant="outlined" onClick={() => { apppendIngrident({ Name: null, Count: null, Type: null }) }}>הוסף מצרך➕</Button>
            <Button variant="outlined" onClick={() => removeIngrident}>להסרת מצרך❌</Button>

            {Instructions?.map((instruction, index) => (
                <div key={Instructions.id}>
                    <Input placeholder="הכנס הוראה"  {...register(`Instructions.${index}`)} defaultValue={instruction} />
                </div>

            ))}

            <p>{errors.Instructions?.message}</p>
            <Button variant="outlined" onClick={() => apppendInstruction(null)} >הוסף הוראה➕</Button>
            <Button variant="outlined" onClick={() => removeInstruction} >להסרת הוראה❌</Button>
            <br />
            <br />
            <Button variant="outlined" color="secondary" type="submit" className='but' >אישור</Button>
        </Form>





    </>)








}

