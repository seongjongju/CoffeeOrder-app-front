//입력 폼 필드
export interface FormFields {
    label: string;
    placeholder: string;
    type: string;
    autoComplete: string;
    buttonText?: string;
    loading?: boolean;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    errMessage?: string;
    onBlur?: (e:React.FocusEvent<HTMLInputElement>) => void;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
