interface loginDto {
    email: string;
    password: string;
}

interface phoneDto {
    phone?: string;
    phone_number?: string;
}

interface tokenDto {
    token: any;
}

interface locationDto {
    lat: any;
    lng: any;
}

interface emailDto {
    phone: string;
    email: string;
}

interface emailForgottenDto {
    email: string;
}
interface profileDto {
    user_id: string;
}
interface locationAddressDto {
    user_id: string;
    data: any,
    address: string
}

interface claimAddressDto {
    user_id: string;
}

interface uplookAddressDto {
    name: any;
}

interface verifyAddressDto {
    user_id: string;
    data?: any;
    address?: string;
}

interface registerDto {
    email_address: string;
    password_hash: string;
    first_name?: string;
    last_name?: string;
    organizationName?: string;
    phone_number: string
}