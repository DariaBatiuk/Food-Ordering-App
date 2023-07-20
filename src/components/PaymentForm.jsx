import { CardElement, useElements, useStripe, Elements, AddressElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, cartProducts } from "../stores/cart/cartSlice";
import { getAddress, clearAddress } from "../pages/userInfo/addressSlice";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Button from "./elements/Button";

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
    const [_, setError] = useState(null);
    const dispatch = useDispatch();
    const cart = useSelector(cartProducts);
    const address = useSelector(getAddress);
    const navigate = useNavigate();
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements || !cart.length || !address) {
            return
        }

        setLoading(true)

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodType: 'card',
                    orderItems: cart,
                    userId: 'user-id', // Заменить на значение пользователя
                    shippingAddress: address
                })
            })

            if (response.ok) {
                const { clientSecret } = await response.json()
                console.log({ clientSecret })

                const { error, paymentIntent } = await stripe.confirmCardPayment(
                    clientSecret, {
                        payment_method: {
                            card: elements.getElement(CardElement)
                        },
                    }
                )

                if (error) {
                    return setError(`Payment failed ${error.message}`)
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
                <Button type="submit" disabled={loading}>
                    {
                        loading ?
                        'Loading...' :
                        'Pay Now'
                    }
                </Button>
            </div>
        </form>
    )
}
