import authInstance from "../axios/authServer";
import server from "../axios/server";
import axios from 'axios'

export const authLogin = async (payload: loginDto) => {
    try {
        const { data } = await authInstance.post(`auth/login`, payload);
        return data;
    } catch (error) {
        console.error("Error during authLogin:", error);
        throw new Error("Login failed"); // Re-throw or handle differently
    }
};

export const authForgottenPassword = async (payload: emailForgottenDto) => {
    try {
        const { data } = await authInstance.post(`auth/forgot-password`, payload);
        return data;
    } catch (error) {
        console.error("Error during authForgottenPassword:", error);
        throw new Error("Failed to send password reset email");
    }
};

export const authVerifyPhone = async (payload: phoneDto) => {
    try {
        const { data } = await server.post(`auth/send-otp`, payload);
        return data;
    } catch (error) {
        console.error("Error during authVerifyPhone:", error);
        throw new Error("Failed to send phone verification OTP");
    }
};

export const authVerifyEmail = async (payload: emailDto) => {
    try {
        const { data } = await server.post(`auth/send-verification-email`, payload);
        return data;
    } catch (error) {
        console.error("Error during authVerifyEmail:", error);
        throw new Error("Failed to send email verification");
    }
};

export const authRegister = async (payload: registerDto) => {
    try {
        const { data } = await authInstance.post(`auth/register`, payload);
        return data;
    } catch (error) {
        console.error("Error during authRegister:", error);
        throw new Error("Registration failed");
    }
};

export const emailVerification = async (payload: tokenDto) => {
    try {
        const { data } = await authInstance.post(`auth/verify-email?token=${payload.token}`);
        return data;
    } catch (error) {
        console.error("Error during emailVerification:", error);
        throw new Error("Email verification failed");
    }
};

export const refreshToken = async (payload: tokenDto) => {
    try {
        const { data } = await authInstance.post(`auth/refresh-token`, payload);
        return data;
    } catch (error) {
        console.error("Error during refreshToken:", error);
        throw new Error("Token refresh failed");
    }
};
