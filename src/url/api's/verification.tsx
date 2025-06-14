import { userRequest } from "@/utils/axios";
import server from "../axios/server";

export const listverificationOfficers = async () => {
    try{
    const { data } = await server.get(`/admin/verification/list`);
    return data;

    }catch(err){
        console.log("Error Listing Verification Officer:",err)
    }
};

export const getVerificationOfficer = async () => {
try{
    const { data } = await userRequest.get(`profile`);
    return data;

}catch(err){
    console.log("Error getting Verification Officer:",err)
}

};