
import server from "@/url/axios/server";
import { userRequest } from "@/utils/axios";

export const organizationProfile = async (corp_id: string) => {
    try {
        const { data } = await server.get(`/org/${corp_id}`);
        return data;
    } catch (error) {
        console.log('Error fetching organization profile:', error)
        throw new Error('Failed to fetch organization profile');
    }


}

export const referredProfile = async (role: string) => {
    try {
        const { data } = await userRequest.get(`/profile/referred?role=${role}`);
        return data;
    } catch (error) {
        console.log('Error fetching organization profile:', error)
        throw new Error('Failed to fetch organization profile');
    }
}

export const referredTransaction = async () => {
    try {
        const { data } = await userRequest.get(`/profile/history`);
        return data.data;
    } catch (error) {
        console.log('Error fetching organization profile:', error)
        throw new Error('Failed to fetch organization profile');
    }
}

export const referredBalance = async () => {
    try {
        const { data } = await userRequest.get(`/profile/balance`);
        return data.data;
    } catch (error) {
        console.log('Error fetching organization profile:', error)
        throw new Error('Failed to fetch organization profile');
    }
}

export const walletPayment = async (payload : any) => {
    const { data } = await userRequest.post(`/wallet/registeration/payment`, payload);
    return data
}

export const createSubUsers = async (payload : any) => {
    const { data } = await userRequest.post(`/sub/create/referral`, payload);
    return data
}

export const getgainVerificationAddresses = async (status: string) => {
    try {
        const { data } = await server.get(`/org/verification/request/${status}`);
        return data;
    } catch (error) {
        console.log('Error fetching organization profile:', error)
        throw new Error('Failed to fetch organization profile');
    }


}