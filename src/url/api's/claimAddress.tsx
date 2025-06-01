import server from "../axios/server";
import authInstance from "../axios/authServer";

export const getAddressData = async (payload: locationDto) => {
    try {
        const { data } = await server.get(`address/claim/full/${payload.lat}/${payload.lng}`);
        return data;
    } catch (error) {
        console.error("Error fetching address data:", error);
        // Handle the error appropriately - re-throw, return a default value, etc.
        throw new Error("Failed to fetch address data");
    }
};

export const createAddressData = async (payload: locationAddressDto) => {
    try {
        const { data } = await server.post(`user/${payload.user_id}/address/claim/${payload.address}`, payload.data);
        return data;
    } catch (error) {
        console.error("Error creating address data:", error);
        throw new Error("Failed to create address data");
    }
};

export const fetchAddressData = async (payload: claimAddressDto) => {
    try {
        const { data } = await server.get(`user/${payload.user_id}/claimed-addresses`);
        return data;
    } catch (error) {
        console.error("Error fetching address data:", error);
        throw new Error("Failed to fetch address data");
    }
};

export const fetchLookUpData = async (payload: uplookAddressDto) => {
    try {
        const { data } = await authInstance.post(`/address/lookup/${payload.name}`);
        return data;
    } catch (error) {
        console.error("Error fetching look up data:", error);
        throw new Error("Failed to fetch look up data");
    }
};

export const fetchVerifyAddressData = async (payload: claimAddressDto) => {
    try {
        const { data } = await server.get(`user/${payload.user_id}/validated`);
        return data;
    } catch (error) {
        console.error("Error fetching verification data:", error);
        throw new Error("Failed to fetch verification data");
    }
};

export const verifyAddressData = async (payload: verifyAddressDto) => {
    try {
        const { data } = await server.post(`user/${payload.user_id}/address-validation`, payload.data);
        return data;
    } catch (error) {
        console.error("Error verifying address data:", error);
        throw new Error("Failed to verify address data");
    }
};

export const DeleteAddressData = async (payload: verifyAddressDto) => {
    try {
        const { data } = await server.delete(`user/${payload.user_id}/address/${payload.data.address}`);
        return data;
    } catch (error) {
        console.error("Error deleting address data:", error);
        throw new Error("Failed to delete address data");
    }
};

