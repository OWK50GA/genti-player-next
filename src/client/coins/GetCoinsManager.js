import { useQuery } from "@tanstack/react-query";
import { HttpClient as Axios } from "../axios";


const useGetCoinsManager = (enabled, isNigerian) => {
    console.log(isNigerian)
    const { data, isLoading } = useQuery({
        queryKey: ["coins_section"],
        queryFn: async () => {
            try {
                const response = await Axios.get(`/get-coins-section`, {
                    isNigerian:isNigerian.toString(),
                    isWeb: true
                });
                return response.data;
            } catch (error) {
                //console.log(error.response.data);
                throw new Error(`Sorry: ${error.response.data.message}`);
            }
        }, 
        enabled
    }
    );
    return {
        coins: data ?? null,
        isLoading
        // pagination: data?.data?.pagination ?? {}
    }
};

export default useGetCoinsManager;
