import { Input } from "@mui/base";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCategory } from "../service/serviceCategory";
import Swal from "sweetalert2";

export default function AddCategory() {
    const categories = useSelector(state => state.categories.categories);
    const [newCategories, setNewCategories] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const schema = yup.object({
        Name: yup.string().required(" שדה חובה")
    });

    const {
        register, handleSubmit, formState: { errors }, reset
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const categoryName = data.Name;

        if (!newCategories.some(category => category.Name === categoryName)) {
            dispatch(addCategory(data));
            setNewCategories(prev => [...prev, data]);
            Swal.fire({ icon: 'success', position: 'center', title: ' קטגוריה חדשה נוצרה' })

        } else {
            Swal.fire({ icon: 'error', position: 'center', title: ' קטגוריה קיימת! ' })



        }
    };



    return (
        <>
            <h4 >הוספת קטגוריה  </h4>

            <div >
                <ul >
                    {categories.map(x => <li style={{ listStyle: "none" }} key={x?.Id}>{x?.Name}</li>)}
                    {newCategories.map(x => <li key={x?.Id}>{x?.Name}</li>)}
                </ul>
            </div>
            <div >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input type="text"{...register("Name")} placeholder="הכנס שם קטגוריה" />
                    <p>{errors.Name?.message}</p>
                    <Button variant="outlined" color="secondary" type="submit" className='but' >אישור</Button>
                </Form>
            </div>

        </>
    );
}
