import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {
    ModalBackground,
    ModalContainer,
    ModalContent,
    CloseButton,
    HeaderModal,
    HeaderTitle,
    CloseIcon,
    FormContent,
    InputRow,
    ButtonConfirm,
    ButtonClose,
    InputForm,
    ButtonsRow,
    FormGroup,
    FieldLabel,
    ImageUploadContainer,
    ImageUploadButton,
} from "./AddDiscographyModal.styles";
import closeIcon from "../../../assets/icons/icon-close.svg";

interface AddDiscographyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormInputs {
    name: string;
    duration: string;
    participation: string;
}

const AddDiscographyModal: React.FC<AddDiscographyModalProps> = ({
    isOpen,
    onClose,
}) => {
    const {register, handleSubmit} = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = data => {
        console.log(data);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalBackground>
            <ModalContainer>
                <ModalContent>
                    <HeaderModal>
                        <HeaderTitle>Adicionar Discografia</HeaderTitle>
                        <CloseButton onClick={onClose}>
                            <CloseIcon src={closeIcon} />
                        </CloseButton>
                    </HeaderModal>
                    <FormContent onSubmit={handleSubmit(onSubmit)}>
                        <InputRow>
                            <div style={{flex: 1}}>
                                <FormGroup>
                                    <FieldLabel>Nome</FieldLabel>
                                    <InputForm
                                        {...register("name", {required: true})}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FieldLabel>Duração</FieldLabel>
                                    <InputForm
                                        {...register("duration", {
                                            required: true,
                                        })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FieldLabel>Participação</FieldLabel>
                                    <InputForm
                                        {...register("participation", {
                                            required: true,
                                        })}
                                    />
                                </FormGroup>
                            </div>
                            <ImageUploadContainer>
                                <ImageUploadButton>
                                    Upload da Capa
                                </ImageUploadButton>
                            </ImageUploadContainer>
                        </InputRow>
                        <ButtonsRow>
                            <ButtonConfirm>Confirmar</ButtonConfirm>
                            <ButtonClose onClick={onClose}>
                                Cancelar
                            </ButtonClose>
                        </ButtonsRow>
                    </FormContent>
                </ModalContent>
            </ModalContainer>
        </ModalBackground>
    );
};

export default AddDiscographyModal;
