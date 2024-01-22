import { useDispatch, useSelector } from "react-redux";
import { addBuying, deleteBuying, editBuying, getBuying } from "../service/serviceBuying";
import { useNavigate } from "react-router-dom";
import {  TableCell, TableRow } from "@mui/material";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'

import { Form, Input } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const schema = yup.object({
    Name: yup.string().required("שדה חובה"),
});
export default function BuyList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId, buyingList } = useSelector((state) => ({
        userId: state.user.user.Id,
        buyingList: state.buying.buyingList,
    }));
    useEffect(() => {
        dispatch(getBuying(userId))
    }, [buyingList]);

    const deleteProduct = (id) => {
        dispatch(deleteBuying(id))

    }
    const increaseAmount = (product) => {
        let productForSent = { Id: product.Id, Name: product.Name, Count: 1, UserId: userId }
        dispatch(editBuying(productForSent))

    }
    const decreaseAmount = (product) => {
        let productForSent = { Id: product.Id, Name: product.Name, Count: -1, UserId: userId }
        if (product.Count > 1) {

            dispatch(editBuying(productForSent))

        }

        else dispatch(deleteBuying(product))
    }

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {

        let productForAdd = { UserId: userId, Name: data.Name, Count: 1 }
        dispatch(addBuying(productForAdd))
    }



    return <>
        <h4 style={{ fontSize: "25px" }}>עגלת הקניות שלי </h4>

        {buyingList?.map((product, i) => (

            <TableRow key={i}>
                <TableCell>{product.Count + " "}</TableCell>
                <TableCell value={product.Name}>{product.Name}</TableCell>
                <TableCell >
                    <Button floated='left' onClick={() => { increaseAmount(product) }}><AddIcon /></Button>
                    <Button floated='left' onClick={() => { decreaseAmount(product) }}><RemoveOutlinedIcon /></Button>
                    <Button floated='left' onClick={() => { deleteProduct(product.Id) }}><DeleteOutlineOutlinedIcon /> </Button>
                </TableCell>
            </TableRow>
        ))
        }
        <Form onSubmit={handleSubmit(onSubmit)}>

            <label>הוסף מוצר</label>
            <input placeholder='שם ' type='text'  {...register("Name")} />
            <p>{errors.Name?.message}</p>


            <Button variant="outlined" color="secondary" type="submit"> הוסף</Button>
        </Form >
    </>


}