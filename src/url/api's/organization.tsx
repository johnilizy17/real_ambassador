
import server from "@/url/axios/server";

export const organizationProfile = async (corp_id: string) => {
    try {
        const { data } = await server.get(`/org/${corp_id}`);
        return data;
    } catch (error) {
        console.log('Error fetching organization profile:', error)
        throw new Error('Failed to fetch organization profile');
    }


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