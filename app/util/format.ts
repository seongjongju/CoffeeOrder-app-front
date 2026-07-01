//연락처 
export const formatPhoneNumber = (value: string) => {
    if (value.length <= 3) return value;
    if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;
    return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
};

//날짜
export const formatCreatedAt = (date: any) => {
    const targetDate = new Date(date);

    const kstDate = new Date(
        targetDate.getTime() + 9 * 60 * 60 * 1000
    );

    return kstDate.toISOString().split('T')[0];
};

//생년월일 
export const formatBirth = (value: string) => {
    if (value.length <= 4) return value;
    return `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`;
};

//가격
export const formatPrice = (price: number ) => {    
    return new Intl.NumberFormat('ko-KR').format(price);
};

//숫자 텍스트 타입
export const formatNumber = (num: string) => {
    const cleanNum = num.replaceAll(',', '');
    
    if (!cleanNum || !/^[0-9]+$/.test(cleanNum)) {
        return "0"; 
    }

    return new Intl.NumberFormat('ko-KR').format(Number(cleanNum));
};