import server from "../axios/server";

export const listverificationOfficers = async () => {
    try{
    const { data } = await server.get(`/admin/verification/list`);
    return data;

    }catch(err){
        console.log("Error Listing Verification Officer:",err)
    }
};

export const getVerificationOfficer = async (userId: string) => {
try{
    const { data } = await server.get(`/verification/${userId}`);
    return data;

}catch(err){
    console.log("Error getting Verification Officer:",err)
}

};