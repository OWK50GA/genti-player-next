import React, { useState, useEffect } from "react";
import "./styles.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Stripe from "stripe";
import Cookies from 'js-cookie';
import { useQuery } from "react-query";
// import Client from "../../client";


const StripePayment = ({ amount, toggle, customer_Id, planId }) => {
    const currentUser = JSON.parse(Cookies.get("GENTI_APP_CURRENT_USER"));
    const stripe_config = new Stripe(
        process.env.NODE_ENV === 'development' ?
        process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
        :
        process.env.NEXT_PUBLIC_STRIPE_PROD_SECRET_KEY
    );
    const stripePromise = loadStripe(
        process.env.NODE_ENV === 'development' ?
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
        : process.env.NEXT_PUBLIC_STRIPE_PROD_PUBLIC_KEY
    );
    const [clientSecret, setClientSecret] = useState(null)
    // const [subscriptionId, setSubscriptionId] = useState(null)
    // const [customerId, setCustomerId] = useState(null)


    const getStripeCustomerId = async () => {
        const response = await stripe_config.customers.create({
            name: currentUser.name,
            email: currentUser.email
        });
        return response.id;
    }

    const getPaymentIntent = async () => {
        try {

            const response = await stripe_config.paymentIntents.create({
                currency: 'usd',
                amount: parseInt(amount * 100),
                payment_method_types: ['card'],
                customer: customer_Id.length > 0 ? customer_Id : await getStripeCustomerId()
                // automatic_payment_methods: {
                //     enabled: true
                // }
            })
            setClientSecret(response.client_secret)
            return response.client_secret
        } catch (err) {
        }
    }

    useQuery(['client_secret', amount, currentUser], () => getPaymentIntent(), {
        enabled: amount && currentUser ? true : false,
        onSuccess: (data) => {
            // setSubscriptions(data.data.result)
        }
    })





    // useEffect(() => {
    //     if (currentUser) {
    //         createSubscription(currentUser)
    //     }
    // }, [currentUser])

    // useEffect(() => {
    //     if (amount && customerId) {
    //         getPaymentIntent(amount * 100, customerId)
    //     }
    // }, [amount, customerId])

    return (

        <div>
            {
                stripePromise && clientSecret &&
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm toggle={toggle} planId={planId} />
                </Elements>
            }

        </div>
    );
};
export default StripePayment;