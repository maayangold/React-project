// import { useDispatch, useSelector } from "react-redux";
// import { addBuying, deleteBuying, editBuying, getBuying } from "../service/serviceBuying";
// import { useNavigate } from "react-router-dom";
// import {  TableCell, TableRow } from "@mui/material";
// import Button from '@mui/material/Button';
// import { useEffect, useState } from "react";
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from 'yup'

// import { Form, Input } from "semantic-ui-react";
// import { useForm } from "react-hook-form";
// import AddIcon from '@mui/icons-material/Add';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

// const schema = yup.object({
//     Name: yup.string().required("שדה חובה"),
// });
// export default function BuyList() {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { userId, buyingList } = useSelector((state) => ({
//         userId : state.user.user.Id, 
//         buyingList: state.buying.buyingList,
//     }));

//     useEffect(() => {
//         dispatch(getBuying(userId))
//     }, [buyingList]);

//     const deleteProduct = (id) => {
//         dispatch(deleteBuying(id))

//     }
//     const increaseAmount = (product) => {
//         let productForSent = { Id: product.Id, Name: product.Name, Count: 1, UserId: userId }
//         dispatch(editBuying(productForSent))

//     }
//     const decreaseAmount = (product) => {
//         let productForSent = { Id: product.Id, Name: product.Name, Count: -1, UserId: userId }
//         if (product.Count > 1) {

//             dispatch(editBuying(productForSent))

//         }

//         else dispatch(deleteBuying(product))
//     }

//     const { register, handleSubmit, formState: { errors }, control } = useForm({
//         resolver: yupResolver(schema)
//     });

//     const onSubmit = (data) => {

//         let productForAdd = { UserId: userId, Name: data.Name, Count: 1 }
//         dispatch(addBuying(productForAdd))
//     }



//     return ( <>
//         <h4 style={{ fontSize: "25px" }}>עגלת הקניות שלי </h4>

//         {buyingList?.map((product, i) => (

//             <TableRow key={i}>
//                 <TableCell>{product.Count + " "}</TableCell>
//                 <TableCell value={product.Name}>{product.Name}</TableCell>
//                 <TableCell >
//                     <Button floated='left' onClick={() => { increaseAmount(product) }}><AddIcon /></Button>
//                     <Button floated='left' onClick={() => { decreaseAmount(product) }}><RemoveOutlinedIcon /></Button>
//                     <Button floated='left' onClick={() => { deleteProduct(product.Id) }}><DeleteOutlineOutlinedIcon /> </Button>
//                 </TableCell>
//             </TableRow>
//         ))
//         }
//         <Form onSubmit={handleSubmit(onSubmit)}>

//             <label>הוסף מוצר</label>
//             <input placeholder='שם ' type='text'  {...register("Name")} />
//             <p>{errors.Name?.message}</p>


//             <Button variant="outlined" color="secondary" type="submit"> הוסף</Button>
//         </Form >
//     </>)


// }
import { useDispatch, useSelector } from "react-redux";
import { addBuying, deleteBuying, editBuying, getBuying } from "../service/serviceBuying";
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const schema = yup.object({
    Name: yup.string().required("שדה חובה"),
});

export default function BuyList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId, buyingList } = useSelector((state) => ({
        userId: state.user.user?.Id,
        buyingList: state.buying.buyingList,
    }));

    useEffect(() => {
        dispatch(getBuying(userId));
    }, [dispatch, userId]);

    const deleteProduct = (id) => {
        dispatch(deleteBuying(id));
    };

    const changeProductAmount = (product, count) => {
        const productForSent = { Id: product.Id, Name: product.Name, Count: count, UserId: userId };
        dispatch(editBuying(productForSent));
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const productForAdd = { UserId: userId, Name: data.Name, Count: 1 };
        dispatch(addBuying(productForAdd));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#f0f0f0", padding: "20px",  margin: "10%"}}>
            <h4 style={{ fontSize: "25px" }}>עגלת הקניות שלי </h4>

            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>שם מוצר</th>
                        <th style={{ textAlign: "center" }}>כמות</th>
                        <th style={{ textAlign: "center" }}>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {buyingList?.map((product) => (
                        <tr key={product.Id}>
                            <td style={{ textAlign: "center" }}>{product.Count}</td>
                            <td style={{ textAlign: "center" }}>{product.Name}</td>
                            <td style={{ textAlign: "center" }}>
                                <Button onClick={() => changeProductAmount(product, product.Count + 1)}><AddIcon /></Button>
                                <Button onClick={() => changeProductAmount(product, product.Count - 1)}><RemoveOutlinedIcon /></Button>
                                <Button onClick={() => deleteProduct(product.Id)}><DeleteOutlineOutlinedIcon /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>הוסף מוצר</label>
                <input placeholder='שם' type='text' {...register("Name")} style={{ width: "", marginBottom: "10px", padding: "8px" }} />
                <p>{errors.Name?.message}</p>
                <Button variant="contained" color="warning" type="submit">הוסף</Button>
            </form>
         
        </div>
    );
}
