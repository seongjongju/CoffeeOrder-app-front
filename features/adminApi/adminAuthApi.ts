const baseUrl = `${process.env.NEXT_PUBLIC_FRONT_API_URL}api/admin`;

export const adminLoginApi = async (adminId: string, password: string) => {
    const url = `/api/admin/admin_login`;
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