import { Input } from "@mui/base";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addCategory, getCategories } from "../service/serviceCategory";
import Swal from "sweetalert2";

export default function AddCategory() {
    const categories = useSelector(state => state.categories.categories);
    const dispatch = useDispatch();

    const schema = yup.object({
        Name: yup.string().required("שדה חובה")
    });

    const {
        register, handleSubmit, formState: { errors }, reset
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const categoryName = data.Name;

        // Check if the category already exists
        const categoryExists = categories.some(category => category.Name === categoryName);

        if (!categoryExists) {
                 dispatch(addCategory(data));
        } else {
            Swal.fire({ icon: 'error', position: 'center', title: 'קטגוריה כבר קיימת' });
        }
    };

    // Fetch categories when the component mounts or when a new category is added
    useEffect(() => {
        dispatch(getCategories());
    }, [categories,dispatch]);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "#f0f0f0", padding: "20px", width: "70%", margin: "10%" }}>
            <div style={{ flex: '1' }}>
                <h4>קטגוריות קיימות</h4>
                <ul>
                    {categories.map(x => <li style={{ listStyle: "none" }} key={x?.Id}>{x?.Name}</li>)}
                </ul>
            </div>
            <div style={{ flex: '1', marginLeft: '20px' }}>
                <h4>הוספת קטגוריה</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input type="text" {...register("Name")} placeholder="הכנס שם קטגוריה" />
                    <p>{errors.Name?.message}</p>
                    <Button variant="contained" color="warning" type="submit" className='but'>אישור</Button>
                </Form>
            </div>
        </div>
    );
}
