import { Input } from "@mui/material";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import Button from '@mui/material/Button';
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
            Swal.fire({ icon: 'info', position: 'top', title: 'קטגוריה  קיימת',timer:"1000",showConfirmButton:false });
        }
    };

    // Fetch categories when the component mounts or when a new category is added
    useEffect(() => {
        dispatch(getCategories());
    }, [categories,dispatch]);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "#f0f0f0", padding: "20px", margin: "10%" }}>
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                <h4 style={{ marginBottom: '20px' }}>קטגוריות קיימות</h4>
                <ul style={{ padding: 0 }}>
                    {categories.map(x => (
                        <li key={x?.Id} style={{ listStyle: "none", marginBottom: '8px' }}>{x?.Name}</li>
                    ))}
                </ul>
            </div>
            <div style={{ flex: '1', marginLeft: '20px'}}>
                <h4 style={{ marginBottom: '20px' }}>הוספת קטגוריה</h4>
                <Form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column',padding:"100px" }}>
                    <Input type="text" {...register("Name")} placeholder="הכנס שם קטגוריה" style={{position:"relative",width:"50%" }}/>
                    <p>{errors.Name?.message}</p>
                    <Button variant="contained" type="submit" style={{ marginTop: '10px',position:"relative",width:"120px" }}>אישור</Button>
                </Form>
            </div>
        </div>
    );
}