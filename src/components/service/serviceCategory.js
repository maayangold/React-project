
import axios from "axios";

export const getCategories = () => {
    return dispatch => {
        axios.get("http://localhost:8080/api/category").then(res => {

            dispatch({ type: "SET_CATEGORIES", payload: res.data })
            console.log(res.data)

        })
            .catch(err => console.log(err));
    }
}

export const addCategory = (data) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe', data)
        .then(() => {
            dispatch({ type: "ADD_CATEGORY", payload: data })
        })
        .catch((error) => {
            console.error(error)
        })
}
