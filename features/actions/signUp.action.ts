import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const signUpActionApi = {
    submitSignUp: async (
        id:string,
        password:string,
        name:string,
        phoneNumber:string,
        email:string,
        certificationNumber:string,
        birth:string
    ) => {
        const {data} = await api.post('/api/users/register', 
            {
                id,
                password,
                name,
                phoneNumber,
                email,
                certificationNumber,
                birth
            }
        )

        return data;
    },
};