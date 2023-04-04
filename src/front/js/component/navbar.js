import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [loggedIn, setLoggedIn] = useState(false);

	// Verificar si el usuario está conectado cuando el componente se carga
	useEffect(() => {
		setLoggedIn(!!store.accessToken);
	}, [store.accessToken]);

	// Función para cerrar sesión
	const handleLogout = async () => {
		await actions.logout();
		setLoggedIn(false);
	};
	console.log('store.accessToken:', store.accessToken);
	console.log('store.refreshToken:', store.refreshToken);
	console.log('store.accessToken ? "/profile" : "/signup":', store.accessToken ? "/profile" : "/signup");
	console.log('store.accessToken ? "Profile" : "Sign up":', store.accessToken ? "Profile" : "Sign up");


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"></span>
				</Link>
				<div className="ml-auto">
					{loggedIn ? (
						<Link className="mr-1" to="/profile">
							<button className="btn btn-primary">Profile</button>
						</Link>
					) : (
						<Link className="mr-1" to="/signup">
							<button className="btn btn-primary">Sign up</button>
						</Link>
					)}
					{loggedIn ? (
						<button className="btn btn-primary" onClick={handleLogout}>
							Log out
						</button>
					) : (
						<Link to="/login">
							<button className="btn btn-primary">Log in</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};
