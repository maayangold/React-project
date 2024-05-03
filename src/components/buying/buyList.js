
import { useDispatch, useSelector } from "react-redux";
import { addBuying, deleteBuying, editBuying, getBuying } from "../service/serviceBuying";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useEffect, useId } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Swal from "sweetalert2";

const schema = yup.object({
    Name: yup.string().required("שדה חובה"),
});

export default function BuyList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector(state => state.user.user?.Id);
    const buyingList = useSelector(state => state.buying.buyingList);


    useEffect(() => {
        dispatch(getBuying(userId))
    }, []);


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userData'));
        if (storedUser) {
            dispatch({ type: 'SET_USER', payload: storedUser });
            dispatch(getBuying(userId))
        }
    }, [buyingList,userId]);
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
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const existingProduct = buyingList.find(product => product.Name === data.Name);
        if (existingProduct) {
            Swal.fire({
                title: "המוצר כבר קיים ברשימה",
                text: "האם ברצונך לשנות את הכמות של המוצר?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "כן",
                cancelButtonText: "לא",
            }).then((result) => {
                if (result.isConfirmed) {
                    increaseAmount(existingProduct);
                }
            });
        } else {
            const productForAdd = { UserId: userId, Name: data.Name, Count: 1 };
            dispatch(addBuying(productForAdd));
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#f0f0f0", padding: "20px", margin: "10%" }}>
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
                            <td style={{ textAlign: "center" }}>{product.Name}</td>
                            <td style={{ textAlign: "center" }}>{product.Count}</td>
                            <td style={{ textAlign: "center" }}>
                                <Button onClick={() => increaseAmount(product)}><AddIcon /></Button>
                                <Button onClick={() => decreaseAmount(product)}><RemoveOutlinedIcon /></Button>
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
