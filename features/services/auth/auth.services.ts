import axios from "axios";

export const api = axios.create({
    baseURL: '/api/auth',
    withCredentials: true
});

//*************************회원가입
//아이디 중복확인
export const idReduplicationApi = async (id: string) => {
    const res = await api.post('/id_reduplication',
        { id }
    );

    const data = await res.data;

    console.log(res)
    return data;;
};

// export const authApi = {
//     isLogout: async () => {
//         const { data } = await api.post('/api/users/logout',
//             {},
//         );

//         return data;
//     },
// };