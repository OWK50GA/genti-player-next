import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { HttpClient as Axios } from '../axios';

const VerifyPaymentManager = () => {
    const { mutate: verifyTransaction, isLoading, isSuccess } = useMutation({
        mutationFn: async (data) => {

            const response = await Axios.post('/buy-coins', data);
            //console.log(response)
            if (response?.data?.error) {
                toast.error(response?.data?.error?.message)
            } else {
                toast.success(response?.data?.message)
            }
        }, 
        onError: (error) => {
            //console.log(error)
            if (error?.response) return toast.error(error?.response?.data?.data?.message)
            else if (error?.data) return toast.error(error?.data?.message)
            else return toast.error(error?.message)
        }
    }
    )
    return {
        verifyTransaction,
        isLoading,
        isSuccess,
    };
};
export default VerifyPaymentManager;