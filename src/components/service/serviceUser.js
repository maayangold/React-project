import axios from "axios";
import Swal from "sweetalert2";

export const addUser = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8080/api/user/sighin", {
                Username: data.Username,
                Password: data.Password,
                Name: data.Name,
                Phone: data.Phone,
                Email: data.Email,
                Tz: data.Tz
            }).then(response => {
                dispatch({ type: 'SET_USER', payload: response.data });
                localStorage.setItem('userData', JSON.stringify(response.data));
                Swal.fire({ icon: 'success', position: 'top-start', timer:"1000", title: ' ברוך הבא! נרשמת בהצלחה' ,showConfirmButton: false});
                resolve();
            }).catch(error => {
                Swal.fire({ icon: 'error', position: 'top-start', title: error.response?.data });
                reject();
            });
        });
    };
};
export const loginUser = (userData) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8080/api/user/login", {
                Username: userData.Username,
                Password: userData.Password
            })
                .then(res => {
                    dispatch({ type: "SET_USER", payload: res.data });
                    // Store user data in localStorage
                    localStorage.setItem('userData', JSON.stringify(res.data));

                    resolve(); // Resolve the promise on successful login
                })
                .catch(err => {
                    console.error(err);
                    reject(); // Reject the promise if login fails
                });
        });
    };
};
