import { removeToken, saveToken } from "@/lib/auth";
import axiosInstance from "@/lib/service";

export const useAuth = () => {

    const signup = async (name: string, email: string, password: string) => {

        try {

            const res = await axiosInstance.post("/auth/register", { name, email, password });

            saveToken(res.data.token);

            return true;

        } catch (error) {

            console.error("Register Failed:", error);

            return false;

        }

    };

    const login = async (email: string, password: string) => {

        try {

            const res = await axiosInstance.post("/auth/login", { email, password });

            saveToken(res.data.token);

            return true;

        } catch (error) {

            console.error("Login Failed:", error);

            return false;

        }

    };

    const logout = () => {

        removeToken();

    };

    return { signup, login, logout };

};