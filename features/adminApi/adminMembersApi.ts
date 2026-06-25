import { baseUrl_1 } from "./base";

//전체 회원 조회
export const getMembersApi = async () => {
    const url = `${baseUrl_1}/admin_members`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: "no-store" as const,
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
};