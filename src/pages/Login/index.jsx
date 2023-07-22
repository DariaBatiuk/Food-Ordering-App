import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import { auth, signInWithEmailAndPassword } from "../../firebase-config";
import { login } from '../../stores/user/userSlice';

import Button from "../../components/elements/Button";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const onSubmit = ({ email, password }) => {
		setLoading(true);

		signInWithEmailAndPassword(auth, email, password)
			.then(({ user: { email, uid, displayName } }) => {
				dispatch(login({
					email,
					uid,
					displayName
				}));

				setLoading(false);
				toast.success('Successful Login!🎉', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark'
				});
				
				navigate('/');
			})
			.catch((error) => {
				if (error.code === 'auth/wrong-password'){
					toast.error('Wrong Password')
				}

				if (error.code === 'auth/user-not-found'){
					toast.error('Email is not found, please register')
				}
				
				setLoading(false);
			})
	}

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 transition duration-300 animate-pink blur gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
        <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
					<h5 className="text-3xl">Login</h5>
          <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label
							htmlFor="email"
							className="block text-lg font-medium text-gray-200"
							>
							Email
							</label>
							<input {...register('email')} id="email" type="email" className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"/>
						</div>
						<div>
							<label
							htmlFor="password"
							className="block text-lg font-medium text-gray-200"
							>
							Password
							</label>
							<input {...register('password')} id="password" type="password" className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"/>
						</div>
						<Button size="large" >{loading ? 'Loading' : 'Login'}</Button>
					</form>
					<ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
