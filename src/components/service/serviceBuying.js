import axios from "axios";
import Swal from "sweetalert2";
export const getBuying = (userId) => {
    return dispatch =>
        axios.get(`http://localhost:8080/api/bay/${userId}`)
            .then((x) => {
                dispatch({ type: 'SET_BUYING', payload: x.data })
            })
            .catch(err => console.error(err));
}
export const deleteBuying = (productId) => {
    return dispatch => {
        Swal.fire({
            title: "אתה בטוח שאתה רוצה למחוק?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Cancel`,
            position: "center"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`http://localhost:8080/api/bay/delete/${productId}`)
                    .then(() => {
                        dispatch({ type: 'DELETE_BUYING', payload: productId });
                        Swal.fire({ icon: 'success', position: 'top', timer: "1000", title: 'המוצר נמחק בהצלחה' });
                    })
                    .catch((error) => { console.error(error) });
            } else {
                Swal.fire({
                    icon: "info",
                    title: 'ביטול',
                    showConfirmButton: false,
                    position: "center",
                    timer: "1000"
                });
            }
        });
    }
}




export const editBuying = (product) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay`, product)
            .then((x) => {
                dispatch({ type: 'EDIT_BUYING', payload: product })
                Swal.fire({ icon: 'success', position: 'top-start', timer: "1000", title: ' המוצר התעדכן בעגלה  בהצלחה', showConfirmButton: false })

            })
            .catch((error) => {
                Swal.fire({ icon: 'error', position: 'top-start', title: error.response?.data })
            })
    }
}

export const addBuying = (product) => {
    return dispatch => {

        axios.post(`http://localhost:8080/api/bay`, product)
            .then((res) => {
                dispatch({ type: 'ADD_BUYING', payload: res.data })
                Swal.fire({ icon: 'success', position: 'top-start', timer: "1000", title: ' המוצר התוסף לעגלת הקניות בהצלחה', showConfirmButton: false })
            }).catch((error) => {
                Swal.fire({ icon: 'error', position: 'top-start', title: error.response?.data })
            })
    }
}
