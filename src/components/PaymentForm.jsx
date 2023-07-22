import { CardElement, useElements, useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { payment } from '../api/payment'
import { clearCart, cartProducts } from "../stores/cart/cartSlice";
import { getAddress, clearAddress } from "../pages/userInfo/addressSlice";
import Button from "./elements/Button";
import { selectUser } from "../stores/user/userSlice";

const stripePromise = loadStripe("pk_test_51NUGZ7BGx0jyYgZOv3QblUhsRFgyIazH0eH5iaFU52XiGexL2klrc9QcAbDxzQvUM7WFTS93O2dzm0OTXleVYRBY00nSkDZfkD");

export const StripeWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    )
}

const PaymentForm = () => {
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState(null);
    const dispatch = useDispatch();
    const cart = useSelector(cartProducts);
    const address = useSelector(getAddress);
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (e) => {
        setError()
        e.preventDefault()

        if (!stripe || !elements || !cart.length || !address || !user) {
            return
        }

        setLoading(true)

        try {
            const data = await payment().createPaymentIntent({
                paymentMethodType: 'card',
                orderItems: cart,
                uid: user.uid,
                shippingAddress: address
            })

            console.log({ data })

            if (data) {
                const { clientSecret } = data
                console.log({ clientSecret })

                const { error, paymentIntent } = await stripe.confirmCardPayment(
                    clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement)
                    },
                })

                if (error) {
                    return setError({ message: `Payment failed ${error.message}` })
                }

                if (paymentIntent.status === 'succeeded') {
                    dispatch(clearAddress())
                    dispatch(clearCart())
                    navigate('/payment-success')
                }
            }
        } catch (err) {
            console.log(err)
            setError(err)
        }

        setLoading(false)
    }

    return (
        <form className="md:-2/3 md:mx-auto px-2 pt-1" id="payment-form" onSubmit={handleSubmit}>
            <label htmlFor="card-element" className="pt-4 text-2xl md:text-center">Please enter your card details</label>
            <div className="my-4">
                <CardElement id="card-element" />
            </div>
            <div className="flex justify-center p-2">
                {
                    !user
                        ? (
                            <>
                            <div className="flex flex-col">
                                <Button onClick={() => navigate('/login')} className="shrink w-64">Sign In</Button>
                                <Button onClick={() => navigate('/register')} className="shrink w-64 mt-2">Sign Up</Button>
                            </div>
                            </>
                        )
                        : (
                            <>
                                <Button type="submit" disabled={loading}>
                                    {
                                        loading ? 'Loading...' : 'Pay Now'
                                    }

                                </Button>
                            </>
                        )
                }
            </div>
            {
                err && err.message ?
                    <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
                        {err.message}
                    </div> : ''
            }
        </form>
    )
}
