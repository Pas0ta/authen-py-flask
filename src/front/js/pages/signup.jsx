import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signedUp, setSignedUp] = useState(false);
	const [msg, setMsg] = useState("");

	const submitsignup = async (e) => {
		e.preventDefault();
		let resp = await actions.signup(email, password);
		console.log(resp);
		if (resp === "email already in use") {
			setMsg(<p className="text-danger">This email already exists, please try another one.</p>);
		} else {
			setSignedUp(true);
		}
	};

	return (
		<div className="container text-center">
			<h1 className="mb-5">SIGN UP</h1>
			{signedUp ? (
				<div className="py-5">
					<h2 className="mb-4">Sign up successful</h2>
					<p>You can access with your email and password.</p>
				</div>
			) : (
				<form className="w-50 mx-auto">
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">
							Email address
						</label>
						<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
						{msg}
						<div id="emailHelp" className="form-text">
							We'll never share your email with anyone else.
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">
							Password
						</label>
						<input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
					</div>
					<button type="submit" className="btn btn-primary" onClick={(e) => submitsignup(e)}>
						Submit
					</button>
				</form>
			)}
		</div>
	);
};


