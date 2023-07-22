import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, auth } from '../firebase-config';
import { login, logout, selectUser } from '../stores/user/userSlice'
import foody from "../assets/images/foody.png";
import cartIcon from "../assets/icons/cart.svg";
import Button from "./elements/Button";

export const Header = ({ cartCount }) => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	
	useEffect(() => {
		onAuthStateChanged(auth, (userAuth) => {
			if (userAuth) {
				dispatch(login({
					email: userAuth.email,
					uid: userAuth.uid,
					displayName: userAuth.displayName
				}))
			} else {
				dispatch(logout())
			}
		})
	}, [])

	return (
		<nav id="header" className="bg-black text-white">
			<div className="container w-full mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
				<div className="logo_wrapper pl-4 flex items-center">
					<Link
						to="/"
						className="toogleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
					>
						<img src={foody} alt="logo" className="w-40 h-40 object-cover" />
					</Link>
				</div>
				<div className="nav-menu-wrapper flex items-center justify-between space-x-10">
					<Link to="/" className="text-xl text-white">Home</Link>
					<Link to="#about" className="text-xl text-white">About</Link>
				</div>
				<div className="flex items-center justify-center space-x-4">
					<Link to="/cart" className="mr-4 relative">
						<img src={cartIcon} alt="cart" />
						{cartCount > 0 ? <div className="rounded-full bg-yellow-400 text-white inline-flex justify-center items-center w-full absolute -top-1 -right-1">{cartCount}</div> : null}
					</Link>
					{
						user ? <Button onClick={() => auth.signOut()}>Log Out</Button> : (
							<>
								<Link to="/login" className="text-white">Log In</Link>
								<Link to="/register" className="text-white">Sign Up</Link>
							</>
						)
					}
				</div>
			</div>
		</nav>
	);
};

export default Header;
