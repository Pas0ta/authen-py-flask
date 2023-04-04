import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";


export const Login = (props) => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    async function submitLogin(e) {
        e.preventDefault();
        let resp = await actions.login(email, password);
        if (resp) {
            navigate("/profile");
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card w-50">
                <div className="card-body">
                    <h1 className="card-title text-center mb-5">Login</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            onClick={(e) => submitLogin(e)}
                        >
                            Submit
                        </button>
                    </form>
                    <p className="mt-3 text-center">
                        Don't have an account yet?{" "}
                        <Link to="/signup" className="link-primary">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    prop: PropTypes.string,
};
