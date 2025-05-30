import { userRequest } from "../axios";

export const getTenAsset = async () => {
        const { data } = await userRequest.get("/asset/firstTen");
        return data;
};

export const getAirbnbSingle = async (id: string) => {
        const { data } = await userRequest.get(`/airbnb/single/${id}`);
        return data;
};

export const createSub = async (payload: any) => {
        const { data } = await userRequest.post(`sub`, payload);
        return data;
};


export const createSubBalance = async () => {
        const { data } = await userRequest.get(`sub/cal`);
        return data;
};