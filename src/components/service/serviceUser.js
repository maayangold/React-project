
import axios from "axios";
import Swal from "sweetalert2";

export const addUser = (data) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/user/sighin", {
            Username: data.Username,
            Password: data.Password,
            Name: data.Name,
            Phone: data.Phone,
            Email: data.Email,
            Tz: data.Tz
        }).then(x => {

            dispatch({ type: 'SET_USER', payload: x.data })
            Swal.fire({ icon: 'success', position: 'center', title: ' ברוך הבא נרשמת בהצלחה' });
        })
            .catch((err) => {
                Swal.fire({ icon: 'error', position: 'center', title: err.response?.data });
            });
    }
}