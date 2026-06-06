const baseUrl = '/api/admin';

//로그인
export const adminLoginApi = async (adminId: string, password: string) => {
    const url = `${baseUrl}/admin_login`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({adminId, password}),
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
};

//로그아웃
export const adminLogoutApi = async () => {
    const url = `${baseUrl}/admin_logout`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
};