import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import {
    getToken
} from "../store/tokenUtilities.jsx";

const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            message: null,
            demo: [{
                    title: "FIRST",
                    background: "white",
                    initial: "white",
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white",
                },
            ],
            user: [],
            auth: false,
        },
        actions: {
            // Use getActions to call a function within a fuction
            logout: () => {
                localStorage.removeItem("token");
                setStore({
                    auth: false,
                });
            },

            validToken: async () => {
                // console.log(response.data.isLogged)
                let token = localStorage.getItem("token");
                console.log(token);
                try {
                    let response = await axios.get(
                        "https://3001-pas0ta-authenpyflask-op69hxykj7c.ws-eu93.gitpod.io/valid-token", {
                            headers: {
                                Authorization: "Bearer " + token,
                            },
                        }
                    );

                    if (response.status === 200) {
                        console.log(response);
                        setStore({
                            auth: response.data.isLogged,
                        });

                        // console.log(response) //aca hay un error el response no trae.data.isLogged revisar ver dia 30 youtube
                        return true;
                    }
                } catch (error) {
                    Toastify({
                        text: "Requiere inicio de sesión",
                        duration: 3000,
                        destination: "https://github.com/apvarun/toastify-js",
                        newWindow: true,
                        close: true,
                        gravity: "top", // top or bottom
                        position: "right", // left, center or right
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "black",
                        },
                        onClick: function() {}, // Callback after click
                    }).showToast();
                    return false;
                }
            },
            login: async (email, password) => {
                console.log(email, password);
                try {
                    let response = await axios.post(
                        "https://3001-pas0ta-authenpyflask-op69hxykj7c.ws-eu93.gitpod.io/login", {
                            email: email,
                            password: password,
                        }
                    );
                    if (response.status === 200) {
                        localStorage.setItem("token", response.data.access_token);
                        setStore({
                            auth: true,
                        });
                        Toastify({
                            text: "Successfull, loging in",
                            duration: 3000,
                            destination: "https://github.com/apvarun/toastify-js",
                            newWindow: true,
                            close: true,
                            gravity: "top", // `top` or `bottom`
                            position: "right", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                                background: "black",
                            },
                            onClick: function() {}, // Callback after click
                        }).showToast();
                        // console.log(response.data.access_token)
                        return true;
                    }
                } catch (error) {
                    console.log(error);
                    if (error.response.status === 401)
                        Toastify({
                            text: "Email o contraseña no válido",
                            duration: 3000,
                            destination: "https://github.com/apvarun/toastify-js",
                            newWindow: true,
                            close: true,
                            gravity: "top", // `top` or `bottom`
                            position: "right", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                                background: "black",
                            },
                            onClick: function() {}, // Callback after click
                        }).showToast();
                    return false;
                }
            },

            getDataProfile: () => {
                fetch("https://3001-pas0ta-authenpyflask-op69hxykj7c.ws-eu93.gitpod.io/profile", {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + getToken(),
                        },
                    })
                    .then((resp) => resp.json())
                    .then((data) => {
                        setStore({
                            user: data.result,
                        });
                    });
            },

            actualizaUsusarioModificado: (password) => {
                fetch("https://3001-pas0ta-authenpyflask-op69hxykj7c.ws-eu93.gitpod.io/profile", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + getToken(),
                        },
                        body: JSON.stringify({
                            password,
                        }),
                    }).then((response) => {
                        if (response.status === 200) {
                            getActions().getDataProfile()
                        }
                        if (response.status !== 200) {
                            Toastify({
                                text: "Modificación de datos completada",
                                duration: 3000,
                                destination: "https://github.com/apvarun/toastify-js",
                                newWindow: true,
                                close: true,
                                gravity: "top", // top or bottom
                                position: "right", // left, center or right
                                stopOnFocus: true, // Prevents dismissing of toast on hover
                                style: {
                                    background: "black",
                                },
                                onClick: function() {}, // Callback after click
                            }).showToast();
                        }
                    })
                    .catch((error) => console.log(error));
                Toastify({
                    text: "Error al modificar los datos",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", // top or bottom
                    position: "right", // left, center or right
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "black",
                    },
                    onClick: function() {}, // Callback after click
                }).showToast();
            },

            register: async (email, password) => {
                console.log(email, password);

                try {
                    let response = await axios.post(
                        "https://3001-pas0ta-authenpyflask-op69hxykj7c.ws-eu93.gitpod.io/register", {
                            email: email,
                            password: password,
                        }
                    );

                    if (response.status === 200) {
                        Toastify({
                            text: "Usuario creado satisfactoriamente",
                            duration: 3000,
                            destination: "https://github.com/apvarun/toastify-js",
                            newWindow: true,
                            close: true,
                            gravity: "top", // `top` or `bottom`
                            position: "right", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                                background: "black",
                            },
                            onClick: function() {}, // Callback after click
                        }).showToast();

                        return true;
                    }
                } catch (error) {
                    Toastify({
                        text: "Email ya registrado",
                        duration: 3000,
                        destination: "https://github.com/apvarun/toastify-js",
                        newWindow: true,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "black",
                        },
                        onClick: function() {}, // Callback after click
                    }).showToast();

                    // console.log(error);
                    if (error.response.status === 401)
                        // alert(error.response.data.msg)
                        return false;
                }
            },
        },
    };
};

export default getState;