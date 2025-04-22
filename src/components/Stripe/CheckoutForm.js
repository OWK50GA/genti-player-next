import React, { useEffect, useState } from "react";
import {
    // ElementsConsumer,
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import Client from "../../client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CheckoutForm = ({ toggle, planId }) => {
    const router = useRouter();
    const stripe = useStripe()
    const elements = useElements()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const { mutate: verifyTransaction, isLoading: loading } = useMutation({
        mutationFn: Client.subscription.verify_stripe, 
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error.message)
            } else {
                toast.success(data.data.message)
                toggle()
                router.push('/subscription')

            }
        },
        onError: (error) => {
            if (error.response) return toast.error(error.response.data.error.message)
            else if (error.data) return toast.error(error.data.message)
            else return toast.error(error.message)

        }
    })

    const handleSubmit = async event => {
        event.preventDefault();

        // const { stripe, elements } = this.props;
        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success`
            },
            redirect: 'if_required'

        })
        if (error) {
            toast.error(error.message)
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // toast.success('Payment Successful')
            // toggle()
            const data = {
                plan_id: planId,
                reference: paymentIntent.id
            }

            verifyTransaction(data)
        }
        setIsProcessing(false)

    };


    return (
        <div className="p-3">
            {
                stripe && elements && <form onSubmit={handleSubmit}>
                    <div className="d-flex align-items-center justify-content-center">
                        <Image src={'/assets/img/pay3.svg'} alt='stripe' className="mb-3 text-center" width={20} height={20}/>

                    </div>

                    {/* <CardSection /> */}
                    <PaymentElement onReady={() => setIsLoading(false)} />
                    {
                        !isLoading ? <button
                            disabled={isProcessing || isLoading || loading}
                            className="btn-pay mt-3 btn get-app-btn">
                            {
                                isProcessing ? 'Processing...' : 'Confirm'
                            }
                        </button> :
                            <div className="d-flex align-items-center justify-content-center w-100">
                                <RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="3"
                                    animationDuration="0.75"
                                    width="60"
                                    visible={true}
                                />
                            </div>
                    }

                </form>

            }

        </div>
    );

}

export default CheckoutForm;
