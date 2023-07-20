import { app } from "../../firebase-config"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../components/elements/Button"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const auth = getAuth(app)
const controller = new AbortController()

export const Register = () => {
	const navigate = useNavigate()
	const { register, handleSubmit } = useForm()
	const [loading, setLoading] = useState(false)

	const createProfile = async (email, name, uid) => {
		try {
			const response = fetch(`${process.env.REACT_APP_API_URL}/api/create-user`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				signal: controller.signal,
				body: JSON.stringify({ email, name, uid })
			});

			if ((await response).ok) {
				setLoading(false)
				navigate('/')
			}

		} catch (err) {
			setLoading(false)
			console.log(err)
		}
	}

	const registerUser = async (email, name, password) => {
		try {
			setLoading(true)
			const { user } = await createUserWithEmailAndPassword(auth, email, password)

			sessionStorage.setItem('User Id', user.uid)
			sessionStorage.setItem('Auth Token', user.refreshToken)
			window.dispatchEvent(new Event("storage"))

			await createProfile(user.email, name, user.uid)
		} catch (err) {
			setLoading(false)
			console.log(err)
			if (err.code === 'auth/email-already-in-use') {
				toast.error('Email is already in use')
			}
		}
	}

	const onSubmit = (data) => {
		const { email, name, password } = data
		registerUser(email, name, password)
	}

	return (
		<div className="h-screen bg-black flex items-center justify-center">
			<div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
				<div className="absolute inset-0 transition duration-300 animate-pink blur gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
				<div className="p-10 rounded-xl z-10 w-full h-full bg-black">
					<h5 className="text-3xl">Register</h5>
					<form className="w-full space-y-6 " onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label
								htmlFor="name"
								className="block text-lg font-medium text-gray-200"
							>
								Name
							</label>
							<input {...register('name')} id="name" type="text" className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200" />
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-lg font-medium text-gray-200"
							>
								Email
							</label>
							<input {...register('email')} id="email" type="email" className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200" />
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-lg font-medium text-gray-200"
							>
								Password
							</label>
							<input {...register('password')} id="password" type="password" className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200" />
						</div>
						<Button size="large" >{loading ? 'Loading' : 'Register'}</Button>
					</form>
					<ToastContainer />
				</div>
			</div>
		</div>
	);
};

export default Register;
