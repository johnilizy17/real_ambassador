import server from "../axios/server";

export const metrics = async () => {
    try {
        const { data } = await server.get("/admin/dash");
        return data;
    } catch (error) {
        console.error("Error fetching metrics:", error);
        throw new Error("Failed to fetch metrics"); // Re-throw or return a default value
    }
};

// Users
export const listUsers = async () => {
    try {
        const { data } = await server.get("/admin/users");
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
};

export const createUser = async (userData: any) => {
    try {
        const { data } = await server.post("/admin/users", userData);
        return data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
};

export const updateUser = async (userId: string, userData: any) => {
    try {
        const { data } = await server.put(`/admin/users/${userId}`, userData);
        return data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const { data } = await server.delete(`/admin/users/${userId}`);
        return data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
    }
};

// Organizations
export const listOrganizations = async () => {
    try {
        const { data } = await server.get("/admin/organizations");
        return data;
    } catch (error) {
        console.error("Error fetching organizations:", error);
        throw new Error("Failed to fetch organizations");
    }
};

export const createOrganization = async (orgData: any) => {
    try {
        const { data } = await server.post("/admin/organizations", orgData);
        return data;
    } catch (error) {
        console.error("Error creating organization:", error);
        throw new Error("Failed to create organization");
    }
};

export const updateOrganization = async (orgId: string, orgData: any) => {
    try {
        const { data } = await server.put(`/admin/organizations/${orgId}`, orgData);
        return data;
    } catch (error) {
        console.error("Error updating organization:", error);
        throw new Error("Failed to update organization");
    }
};

export const deleteOrganization = async (orgId: string) => {
    try {
        const { data } = await server.delete(`/admin/organizations/${orgId}`);
        return data;
    } catch (error) {
        console.error("Error deleting organization:", error);
        throw new Error("Failed to delete organization");
    }
};


export const claimAddressForOrganization = async (orgId: string, addressData: any) => {
    try {
        const { data } = await server.post(`/admin/organizations/${orgId}/addresses`, addressData);
        return data;
    } catch (error) {
        console.error("Error claiming address for organization:", error);
        throw new Error("Failed to claim address for organization");
    }
};

export const getClaimedAddressesForOrganization = async (orgId: string) => {
    try {
        const { data } = await server.get(`/admin/organizations/${orgId}/addresses`);
        return data;
    } catch (error) {
        console.error("Error getting claimed addresses for organization:", error);
        throw new Error("Failed to get claimed addresses for organization");
    }
};


export const updateClaimedAddressForOrganization = async (orgId: string, claimId: string, addressData: any) => {
    try {
        const { data } = await server.put(`/admin/organizations/${orgId}/addresses/${claimId}`, addressData);
        return data;
    } catch (error) {
        console.error("Error updating claimed address for organization:", error);
        throw new Error("Failed to update claimed address for organization");
    }
};

export const deleteClaimedAddressForOrganization = async (orgId: string, claimId: string) => {
    try {
        const { data } = await server.delete(`/admin/organizations/${orgId}/addresses/${claimId}`);
        return data;
    } catch (error) {
        console.error("Error deleting claimed address for organization:", error);
        throw new Error("Failed to delete claimed address for organization");
    }
};

export const createOrganizationType = async (typeData: any) => { // New function
    try {
        const { data } = await server.post('/admin/organizationTypes', typeData);
        return data;
    } catch (error) {
        console.error("Error creating organization type:", error);
        throw new Error("Failed to create organization type");
    }
};

export const listOrganizationTypes = async () => { // New function
    try {
        const { data } = await server.get('/admin/organizationTypes');
        return data;
    } catch (error) {
        console.error("Error listing organization types:", error);
        throw new Error("Failed to list organization types");
    }
};


export const updateOrganizationType = async (typeId: string, typeData: any) => { // New function
    try {
        const { data } = await server.put(`/admin/organizationTypes/${typeId}`, typeData);
        return data;
    } catch (error) {
        console.error("Error updating organization type:", error);
        throw new Error("Failed to update organization type");
    }
};

export const deleteOrganizationType = async (typeId: string) => { // New function
    try {
        const { data } = await server.delete(`/admin/organizationTypes/${typeId}`);
        return data;
    } catch (error) {
        console.error("Error deleting organization type:", error);
        throw new Error("Failed to delete organization type");
    }
};


export  const updateOrganizationTypeAssignment = async (orgId: string, typeData: any) => {
    try {
        const { data } = await server.put(`/admin/organizations/${orgId}/type`, typeData);
        return data;
    } catch (error) {
        console.error("Error updating organization type assignment:", error);
        throw new Error("Failed to update organization type assignment");
    }
};

export const getOrganizationsByType = async (typeId: string) => {
    try {
        const { data } = await server.get(`/admin/organizationTypes/${typeId}/organizations`);
        return data;
    } catch (error) {
        console.error("Error getting organizations by type:", error);
        throw new Error("Failed to get organizations by type");
    }
};


// Verification Officers
export const createVerificationOfficer = async (officerData: any) => {
    try {
        const { data } = await server.post('/admin/verificationOfficers', officerData);
        return data;
    } catch (error) {
        console.error("Error creating verification officer:", error);
        throw new Error("Failed to create verification officer");
    }
};

export const getVerificationOfficer = async (officerId: string) => {
    try {
        const { data } = await server.get(`/admin/verificationOfficers/${officerId}`);
        return data;
    } catch (error) {
        console.error("Error fetching verification officer:", error);
        throw new Error("Failed to fetch verification officer");
    }
};

export const updateVerificationOfficer = async (officerId: string, officerData: any) => {
    try {
        const { data } = await server.put(`/admin/verificationOfficers/${officerId}`, officerData);
        return data;
    } catch (error) {
        console.error("Error updating verification officer:", error);
        throw new Error("Failed to update verification officer");
    }
};

export const deleteVerificationOfficer = async (officerId: string) => {
    try {
        const { data } = await server.delete(`/admin/verificationOfficers/${officerId}`);
        return data;
    } catch (error) {
        console.error("Error deleting verification officer:", error);
        throw new Error("Failed to delete verification officer");
    }
};

export const listVerificationOfficer = async () => {
    try {
        const { data } = await server.get(`/admin/verificationOfficers`);
        return data;
    } catch (error) {
        console.error("Error fetching verification officers:", error);
        throw new Error("Failed to fetch verification officers");
    }
};

// Address
export const lookupAddress = async (digitalAddress: string) => {
    try {
        const { data } = await server.get(`/admin/address/lookup/${digitalAddress}`);
        return data;
    } catch (error) {
        console.error("Error looking up address:", error);
        throw new Error("Failed to look up address");
    }
};

export const updateAddress = async (digitalAddress: string, addressData: any) => {
    try {
        const { data } = await server.put(`/admin/address/${digitalAddress}`, addressData);
        return data;
    } catch (error) {
        console.error("Error updating address:", error);
        throw new Error("Failed to update address");
    }
};

export const deleteAddress = async (digitalAddress: string) => {
    try {
        const { data } = await server.delete(`/admin/address/${digitalAddress}`);
        return data;
    } catch (error) {
        console.error("Error deleting address:", error);
        throw new Error("Failed to delete address");
    }
};

// Address Verification Requests
export const getPendingAddressVerifications = async () => {
    try {
        const { data } = await server.get('/admin/pendingVerifications');
        return data;
    } catch (error) {
        console.error("Error fetching pending verifications:", error);
        throw new Error("Failed to fetch pending verifications");
    }
};

export const verifyClaimedAddress = async (claimId: string, verificationData: any) => {
    try {
        const { data: response } = await server.post(`/admin/verifyAddress/${claimId}`, verificationData);
        return response;
    } catch (error) {
        console.error("Error verifying claimed address:", error);
        throw new Error("Failed to verify claimed address");
    }
};

// Roles
export const createRole = async (roleData: any) => {
    try {
        const { data } = await server.post('/admin/roles', roleData);
        return data;
    } catch (error) {
        console.error("Error creating role:", error);
        throw new Error("Failed to create role");
    }
};

export const getRole = async (roleId: string) => {
    try {
        const { data } = await server.get(`/admin/roles/${roleId}`);
        return data;
    } catch (error) {
        console.error("Error fetching role:", error);
        throw new Error("Failed to fetch role");
    }
};

//list roles
export const listRole = async () => {
    try {
        const { data } = await server.get(`/admin/roles`);
        return data;
    } catch (error) {
        console.error("Error fetching roles:", error);
        throw new Error("Failed to fetch roles");
    }
};

export const updateRole = async (roleId: string, roleData: any) => {
    try {
        const { data } = await server.put(`/admin/roles/${roleId}`, roleData);
        return data;
    } catch (error) {
        console.error("Error updating role:", error);
        throw new Error("Failed to update role");
    }
};

export const deleteRole = async (roleId: string) => {
    try {
        const { data } = await server.delete(`/admin/roles/${roleId}`);
        return data;
    } catch (error) {
        console.error("Error deleting role:", error);
        throw new Error("Failed to delete role");
    }
};

// Capabilities
export const createCapability = async (capabilityData: any) => {
    try {
        const { data } = await server.post('/admin/capabilities', capabilityData);
        return data;
    } catch (error) {
        console.error("Error creating capability:", error);
        throw new Error("Failed to create capability");
    }
};

// Transactions (New functions)
export const createTransaction = async (transactionData: any) => {
    try {
        const { data } = await server.post('/admin/transactions', transactionData);
        return data;
    } catch (error) {
        console.error("Error creating transaction:", error);
        throw new Error("Failed to create transaction");
    }
};


export const getTransaction = async (transactionId: string) => {
    try {
        const { data } = await server.get(`/admin/transactions/${transactionId}`);
        return data;
    } catch (error) {
        console.error("Error getting transaction:", error);
        throw new Error("Failed to get transaction");
    }
};

export const updateTransaction = async (transactionId: string, transactionData: any) => {
    try {
        const { data } = await server.put(`/admin/transactions/${transactionId}`, transactionData);
        return data;
    } catch (error) {
        console.error("Error updating transaction:", error);
        throw new Error("Failed to update transaction");
    }
};

export const deleteTransaction = async (transactionId: string) => {
    try {
        const { data } = await server.delete(`/admin/transactions/${transactionId}`);
        return data;
    } catch (error) {
        console.error("Error deleting transaction:", error);
        throw new Error("Failed to delete transaction");
    }
};


export const listTransactions = async () => {
    try {
        const { data } = await server.get('/admin/transactions');
        return data;
    } catch (error) {
        console.error("Error listing transactions:", error);
        throw new Error("Failed to list transactions");
    }
};
