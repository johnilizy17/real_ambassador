import { userFileUpload } from "@/utils/axios";
import server from "../axios/server";


export const getUserProfile = async (userId: string) => {
    const { data } = await server.get(`/user/${userId}`, {
        // headers: { 'X-Environment': env } // Example: Pass environment in headers if required
    });
    return data;
};


export const getKeyUserMetrics = async (userId: string) => {
    const { data } = await server.get(`/user/metrics/${userId}`);
    return data;
};

export const submitKYC = async (userId: string, data: any) => {
    const { data: response } = await server.post(`/user/${userId}/kyc`, data);
    return response;
};

// ... Similarly define functions for other endpoints:

export const updateProfileVerification = async (payload: any) => {

    const formData = new FormData();
    if (payload.file && payload.file.length > 2) {
        formData.append('file', payload.file);        // `selectedFile` is a File object from an <input>
    }
    formData.append('email_address', payload.email);
    formData.append('contact_info', payload.contact_info);
    formData.append('first_name', payload.first_name);
    formData.append('last_name', payload.last_name);

    const { data } = await userFileUpload.put(`user/profile/verification`, payload);
    return data;
};

export const getClaimedAddresses = async (userId: string) => {
    const { data } = await server.get(`/user/${userId}/claimed-addresses`);
    return data;
};

export const createAccountWallet = async (payload: any) => {
    const { data } = await server.post(`wallet`, payload);
    return data;
};

export const verifyWallet = async (payload: any) => {
    const { data } = await server.post(`wallet/verify`, payload);
    return data;
};

export const claimAddress = async (userId: string, address: string, data: any) => {
    const { data: response } = await server.post(`/user/${userId}/address/claim/${address}`, data);
    return response;
};

export const deleteUserClaimedAddress = async (userId: string, addressId: string) => {
    const { data } = await server.delete(`/user/${userId}/address/${addressId}`);
    return data;
};


export const requestAddressValidation = async (userId: string, data: any) => {
    const { data: response } = await server.post(`/user/${userId}/address-validation`, data);
    return response;
};

export const getValidatedAddresses = async (userId: string) => {
    const { data } = await server.get(`/user/${userId}/address-validation`);
    return data;
};

export const getUserPrivacyData = async (userId: string) => {
    const { data } = await server.get(`/user/${userId}/privacy`);
    return data;
};

export const updateUserPrivacySettings = async (userId: string, data: any) => {
    const { data: response } = await server.put(`/user/${userId}/privacy`, data);
    return response;
};

export const deleteUserData = async (userId: string) => {
    const { data } = await server.delete(`/user/${userId}`);
    return data;
};


//cross-worker request, this makes use of internal cloudflare request handling and makes it not subjected to external cors and handling. Check out cloudflare service binding
export const getNotifications = async (userId: string) => {
    const data = await fetch(`http://127.0.0.1:8787/v1/user/${userId}/notifications`);
    if (!data.ok) {
        const errorData: any = await data.json().catch(() => ({ message: 'Unable to parse response' }));
        throw new Error(`HTTP error! status: ${data.status}, message: ${errorData.message || 'Unknown error'}`);
    }

    const notif = await data.json();
    return notif;
};

