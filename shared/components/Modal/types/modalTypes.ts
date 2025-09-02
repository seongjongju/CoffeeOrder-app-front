export type ModalPropsTypes = {
    modalText: string;
    modalClose: () => void;
};

export type ModalTypes = {
    modalActive: boolean;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    signUpNextOnClick: (e: React.MouseEvent<HTMLButtonElement>, checked: boolean) => void;
    modalClose: () => void;
};