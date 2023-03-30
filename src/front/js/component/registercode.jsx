import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../styles/login.css";

export const RegisterCode = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            // user_name: "",
            // first_name: "",
            // last_name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string()
                .max(20, "Must be 20 characters or less")
                .min(8, "Minimum 8 characters")
                .required("Required"),
        }),
        onSubmit: (values) => {
            let isLogged = actions.register(
                values.email,
                values.password
            );
            if (isLogged) {
                //true
                navigate("/login");
            }
        },
    });
    return (
        <div className="container py-5 w-25 mx-auto pt-5 vh-100">

            <h2 className="mb-4">Registro</h2>

            <form className="needs-validation" onSubmit={formik.handleSubmit}>

                <div className="mb-3">
                    <div>
                        <label className="form-outline mb-1" htmlFor="email">
                            Dirección de correo
                        </label>
                        <div>
                            <input
                                className="form-control mb-3"
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <label className="form-outline mb-1" htmlFor="password">
                            Contraseña
                        </label>
                        <div>
                            <input
                                className="form-control mb-3"
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <button
                            className="btn btn-primary rounded"
                            type="submit"
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            </form>

        </div>

    );
};
