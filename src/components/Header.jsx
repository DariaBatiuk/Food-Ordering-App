import foody from "../assets/images/foody.png";
import cartIcon from "../assets/icons/cart.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "./elements/Button";
import { useState, useEffect } from "react";

export const Header = ({ cartCount}) => {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogOut = () => {
		sessionStorage.removeItem('Auth Token');
		sessionStorage.removeItem('User Id');
		window.dispatchEvent(new Event("storage"));
		navigate('/');
	} 

	useEffect(()=>{
		const checkAuthtoken = () => {
			const token = sessionStorage.getItem('Auth Token');
			if (token) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		}

		window.addEventListener('storage', checkAuthtoken);

		return () =>{
			window.removeEventListener('storage', checkAuthtoken);
		}
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
							isLoggedIn ? <Button onClick={handleLogOut}>Log Out</Button> : (
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
