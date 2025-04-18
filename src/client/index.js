import ENDPOINTS from './endpoints';
import { HttpClient, unauthorizedAxios } from './axios';

const Client = {
    auth: {
        login: (data) => HttpClient.post(ENDPOINTS.LOGIN, { ...data, device_id: "web" }),
        register: (data) => HttpClient.post(ENDPOINTS.REGISTER, { ...data, device_id: "web" }),
        forgot_password: (data) => HttpClient.post(ENDPOINTS.FORGOT_PASSWORD, data),
        reset_password: (data) => HttpClient.post(ENDPOINTS.RESET_PASSWORD, data),
        request_otp: (data) => HttpClient.post(ENDPOINTS.REQUEST_OTP, data),
        verify_otp: (data) => HttpClient.post(ENDPOINTS.VERIFY_OTP, data),
        logout: (data) => HttpClient.post(ENDPOINTS.LOGOUT, data),
        facebook_login: (data) => HttpClient.post(ENDPOINTS.FACEBOOK_LOGIN, { ...data, device_id: "web" }),
        google_login: (data) => HttpClient.post(ENDPOINTS.GOOGLE_LOGIN, { ...data, device_id: "web" }),
        store_device_signature: (data) => HttpClient.post(ENDPOINTS.STORE_DEVICE_SIGNATURE, data)
    },
    home: {
        dashboard: () => HttpClient.get(ENDPOINTS.HOME_DASHBOARD),
        rankings: () => HttpClient.get(ENDPOINTS.HOME_RANKINGS),
        trending_titles: () => HttpClient.get(ENDPOINTS.TRENDING_TITLES),
        search_titles: (params) => HttpClient.get(ENDPOINTS.AUTO_SEARCH, params),


    },
    subscription: {
        premium_features: () => HttpClient.post(ENDPOINTS.PREMIUM_FEATURES),
        unauthorized_premium_features: (data) => unauthorizedAxios.post(ENDPOINTS.PREMIUM_FEATURES, data),
        trial_days: () => HttpClient.post(ENDPOINTS.TRIAL_DAYS),
        unauthorized_trial_days: (data) => HttpClient.post(ENDPOINTS.TRIAL_DAYS, data),
        plans: (data) => HttpClient.get(ENDPOINTS.SUBSCRIPTION, data),
        verify_paystack: (data) => HttpClient.post(ENDPOINTS.VERIFY, data),
        verify_stripe: (data) => HttpClient.post(ENDPOINTS.STRIPE_VERIFY, data),
        user_plans: () => HttpClient.get(ENDPOINTS.USER_PLANS),
        customer_id: () => HttpClient.get(ENDPOINTS.CUSTOMER_ID),
        cancel_subscription: () => HttpClient.get(ENDPOINTS.CANCEL_SUBSCRIPTION),
    },
    referral: {
        verify_code: (data) =>
            unauthorizedAxios.get(`${ENDPOINTS.VERIFY_REFERRAL_CODE}?referral_code=${data.referral_code}&encryptedString=${data.encryptedString}`)
    },
    preview: {
        get_share_details: (id) => unauthorizedAxios.get(`${ENDPOINTS.GET_SHARE_DETAILS}/${id}`)
    }
}


export default Client;
