import styled from "styled-components";
import OutlineButton from "../../Buttons/OutlineButton.ui";

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    width: 800px;
    max-width: 90%;
    position: relative;
    border: 2px solid #eaeaed;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
`;

export const HeaderModal = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eaeaed;
    padding: 15px 50px;
    justify-content: space-between;
`;

export const CloseIcon = styled.img`
    width: 15px;
    height: 15px;
`;

export const HeaderTitle = styled.h2`
    margin: 0;
    color: #3b3643;
    font-weight: 600;
`;

export const InputForm = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #eaeaed;
    border-radius: 4px;
    width: 100%;
    color: #363843;
`;

export const ButtonConfirm = styled.button.attrs({
    type: "submit",
})`
    padding: 10px;
    font-size: 24px;
    background-color: #29b56b;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 50px;
    margin-bottom: 15px;
    width: 35%;
    font-weight: 600 !important;

    &:hover {
        background-color: #28a745;
    }

    &:focus-visible {
        background-color: #307f42 !important;
    }

    &:active {
        background-color: #307f42 !important;
    }
`;

export const ButtonClose = styled(OutlineButton).attrs({})`
    background-color: #fff;
    border: 2px solid #9747ff;
    color: #4d5163;
    font-size: 24px;
    padding: 10px;
    margin-bottom: 15px;
    margin-top: 50px;
    width: 35%;
    font-weight: 600 !important;
`;

export const FormContent = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 10px 50px;
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const InputRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 60px;
`;

export const ButtonsRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

export const FieldLabel = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #363843;
`;

export const ImageUploadContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    cursor: pointer;
`;

export const ImageUploadButton = styled.button`
    background-color: #f0f0f5;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    color: #363843;
    cursor: pointer;

    &:hover {
        background-color: #eaeaed;
    }
`;

export const AddDiscographyButton = styled(OutlineButton)`
    font-size: 16px;
    padding: 10px;
    width: fit-content;
    align-self: flex-end;
`;

export const TabsContainer = styled.div`
    display: flex;
    gap: 20px;
    padding-bottom: 20px;
    justify-content: center;
`;

export const TabsList = styled.div`
    display: flex;
    border: 1px solid #eaeaed;
    border-radius: 50px;
`;

export const Tab = styled.div.attrs({})<{active: boolean}>`
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${props => (props.active ? "#EAEAED" : "transparent")};
    border-radius: 50px;
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #9747ff;
`;
