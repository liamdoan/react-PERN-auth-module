import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const userLogin = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            email, password
        }, {
            withCredentials: true
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export const userLogout = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/logout`, {}, {
            withCredentials: true
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/forgot-password`, {
            email
        }, {
            withCredentials: true
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (token: string | undefined, newPassword: string) => {
    if (!token) {
        throw new Error("Token is required!")
    }

    try {
        const response = await axios.post(`${BASE_URL}/reset-password/${token}`, {
            newPassword
        }, {
            withCredentials: true
        })

        return response;
    } catch (error) {
        throw error;
    }
};
