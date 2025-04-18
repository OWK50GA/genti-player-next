import axios from 'axios';
export const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL : process.env.NEXT_PUBLIC_STAGING_BASE_URL,
    // baseURL: process.env.REACT_APP_STAGING_BASE_URL,
    timeout: 5000000,
    headers: {
        'Content-Type': 'application/json',
    },
});



// export 




export const likeTeaser = async (id) => {
    const response = await Axios.get(`/like/${id}`);
    const { data: { result } } = response
}


export const unlikeTeaser = async (id) => {
    const response = await Axios.get(`/unlike/${id}`);
    const { data: { result } } = response
}

export const playTeaser = async (id) => {
    const response = await Axios.get(`/play/${id}`);
    const { data: { result } } = response
}




