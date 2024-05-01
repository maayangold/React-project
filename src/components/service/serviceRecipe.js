import axios from "axios";
import Swal from "sweetalert2";

export const getRecipes = () => {
    return dispatch => {
        axios.get('http://localhost:8080/api/recipe')
            .then(res => {

                dispatch({ type: "SET_RECIPES", payload: res.data })


            })

            .catch((error) =>
                console.error(error)
            )
    }
}
export const deleteRecipe = (recipe) => {
    return dispatch => {


        Swal.fire({
            title: "אתה בטוח שאתה רוצה למחוק?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Cancel`,
            position:"top"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.post(`http://localhost:8080/api/recipe/delete/:${recipe.Id}`)
                    .then(() => {
                        dispatch({ type: "DELETE_RECIPE", payload: recipe })
                        Swal.fire({ icon: 'success', position: 'center', title: '!המתכון נמחק בהצלחה' });

                    })
                    .catch((error) => { console.error(error) })
            } else {   
                Swal.fire({
                    icon: "info",
                    confirmButtonText:"ביטול...",
                    position:"top",
                    timer:"1000"
                });
            }
        });
    }
}
export const addRecipe = (recipe) => {
    return (dispatch) => {
        axios.post('http://localhost:8080/api/recipe', recipe)
            .then((res) => {
                dispatch({ type: "ADD_RECIPE", payload: res.data });
                console.log(res.data);
                Swal.fire({ icon: 'success', position: 'center', title: 'המתכון הוסף בהצלחה' });
            })
            .catch((err) => {
                Swal.fire({ icon: 'error', position: 'top', title: err.response?.data });
            });
    };
};

export const editRecipe = (recipe) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe/edit', recipe).then(
        (res) => {
            dispatch({ type: "EDIT_RECIPE", payload: res.data })
            Swal.fire({ icon: 'success', position: 'center', title: 'המתכון עודכן בהצלחה' })

        }).catch((error) => {
            Swal.fire({ icon: 'error', position: 'top', title: error.response?.data })
        })
}



