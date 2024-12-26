import axios from "axios"

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
        throw error
    }
};
