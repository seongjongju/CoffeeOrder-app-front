export type ModalPropsTypes = {
    modalText: string;
    modalClose: () => void;
};

export type ModalTypes = {
    modalActive: boolean;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    signUpNextOnClick: (e: React.MouseEvent<HTMLButtonElement>, policyIsChecked: boolean) => void;
    modalClose: () => void;
};