import { toast } from 'react-toastify'
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { HttpClient as Axios } from '../axios';
import { useRouter } from 'next/navigation';

const GetTrialCoinManager = () => {
    // const navigate = useNavigate()
    const router = useRouter();
    const { mutate: getTrialCoin, isLoading, isSuccess } = useMutation(async () => {

        const response = await Axios.get('/credit-trail-coins');
        //console.log(response)
        if (response?.data?.error) {
            toast.error(response?.data?.error?.message)
        } else {
            toast.success(response?.data?.message ?? response?.data?.message)
        }
    }, {
        onError: (error) => {
            //console.log(error)
            if (error?.response) return toast.error(error?.response?.data?.data?.message)
            else if (error?.data) return toast.error(error?.data?.message)
            else return toast.error(error?.message)
        }
    }
    )
    return {
        getTrialCoin,
        isLoading,
        isSuccess,
    };
};
export default GetTrialCoinManager;