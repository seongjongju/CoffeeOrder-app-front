const baseUrl = `${process.env.NEXT_PUBLIC_FRONT_API_URL}/api/admin`;

//전체 회원 조회
export const getMembersApi = async () => {
    const url = `${baseUrl}/admin_members`;
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