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
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "למחוק",
            denyButtonText: `לא למחוק`
        }).then((result) => {

            if (result.isConfirmed) {
                axios.post(`http://localhost:8080/api/bay/delete/${productId}`)
                    .then((res) => {
                        dispatch({ type: 'DELETE_BUYING', payload: productId })
                        Swal.fire({ icon: 'success', position: 'center', title: '!המוצר נמחק בהצלחה' });

                    })
                    // .catch((error) => Swal.fire({ icon: 'error', position: 'center', title: error.response?.data }))
                    .catch((error) => Swal.fire({ icon: 'success', position: 'center', title: '!!המוצר נמחק בהצלחה' }))

            } else
                if (result.isDenied) {
                    Swal.fire("ביטול...", "", "info");
                }
        });
    }
}



export const editBuying = (product) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay`, product)
            .then((x) => {
                dispatch({ type: 'EDIT_BUYING', payload: product })
                Swal.fire({ icon: 'success', position: 'center', title: ' המוצר התעדכן בעגלה  בהצלחה' })

            })
            .catch((error) => {
                Swal.fire({ icon: 'error', position: 'center', title: error.response?.data })
            })
    }
}

export const addBuying = (product) => {
    return dispatch => {

        axios.post(`http://localhost:8080/api/bay`, product)
            .then((res) => {
                dispatch({ type: 'ADD_BUYING', payload: res.data })
                Swal.fire({ icon: 'success', position: 'center', title: ' המוצר התוסף לעגלת הקניות בהצלחה' })
            }).catch((error) => {
                Swal.fire({ icon: 'error', position: 'center', title: error.response?.data })
            })
    }
}
