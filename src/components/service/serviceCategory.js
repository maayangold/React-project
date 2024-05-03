
import axios from "axios";
import Swal from "sweetalert2";

export const getCategories = () => {
    return dispatch => {
        axios.get("http://localhost:8080/api/category").then(res => {

            dispatch({ type: "SET_CATEGORIES", payload: res.data })

        })
            .catch(err => console.log(err));
    }
}

export const addCategory = (data) => {
    return dispatch => {
        axios.post('http://localhost:8080/api/category', data)
            .then(() => {
                dispatch({ type: "ADD_CATEGORY", payload: data });
                Swal.fire({
                    icon: 'success',
                    position:"top",
                    title: 'הקטגוריה  התווספה בהצלחה',
                    showConfirmButton: false,
                    timer: 1000
                });
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    position:"top",
                    title: 'שגיאה',
                    text: 'הייתה בעיה בהוספת הקטגוריה, אנא נסה שוב מאוחר יותר.'
                });
            });
    };
};
