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
            position:"center"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.post(`http://localhost:8080/api/recipe/delete/:${recipe.Id}`)
                    .then(() => {
                        dispatch({ type: "DELETE_RECIPE", payload: recipe })
                        Swal.fire({ icon: 'success', position: 'top-start', title: 'המתכון נמחק בהצלחה' ,showConfirmButton: false, timer:"1000"});

                    })
                    .catch((error) => { console.error(error) })
            } else {   
                Swal.fire({
                    icon: "info",
                    title: 'ביטול' 
                    ,showConfirmButton: false,
                    position:"center",
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
                Swal.fire({ icon: 'success', position: 'top-start', title: 'המתכון התווסף בהצלחה', timer:"1000" ,showConfirmButton: false});
            })
            .catch((err) => {
                Swal.fire({ icon: 'error', position: 'top-start', title: err.response?.data });
            });
    };
};

export const editRecipe = (recipe) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe/edit', recipe).then(
        (res) => {
            dispatch({ type: "EDIT_RECIPE", payload: res.data })
            Swal.fire({ icon: 'success', position: 'top-start', title: 'המתכון עודכן בהצלחה' , timer:"1000",showConfirmButton: false})

        }).catch((error) => {
            Swal.fire({ icon: 'error', position: 'top-start', title: error.response?.data })
        })
}



