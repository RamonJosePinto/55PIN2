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
    SelectForm,
    ButtonsRow,
    FormGroup,
    FieldLabel,
    EditImage,
    ImageEditContainer,
    ActualUserImage,
} from "./EditFormModal.styles";

import userDataMock from "../../../mocks/userData.mock.json";
import closeIcon from "../../../assets/icons/icon-close.svg";

interface EditFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormInputs {
    fullName: string;
    username: string;
    email: string;
    password: string;
    country: string;
    userType: string;
}

const EditFormModal: React.FC<EditFormModalProps> = ({isOpen, onClose}) => {
    const {register, handleSubmit, reset} = useForm<FormInputs>({
        defaultValues: userDataMock,
    });

    React.useEffect(() => {
        reset(userDataMock); // Reset form with mock data when modal opens
    }, [reset, isOpen]);

    const onSubmit: SubmitHandler<FormInputs> = data => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalBackground>
            <ModalContainer>
                <ModalContent>
                    <HeaderModal>
                        <HeaderTitle>Edite seu perfil</HeaderTitle>
                        <CloseButton onClick={onClose}>
                            <CloseIcon src={closeIcon} />
                        </CloseButton>
                    </HeaderModal>

                    <ImageEditContainer>
                        <ActualUserImage src={userDataMock.imageUrl} />
                        <EditImage>Baixar imagem</EditImage>
                    </ImageEditContainer>

                    <FormContent onSubmit={handleSubmit(onSubmit)}>
                        <InputRow>
                            <FormGroup>
                                <FieldLabel>Nome Completo</FieldLabel>
                                <InputForm
                                    {...register("fullName")}
                                    type="text"
                                    placeholder="Nome completo"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FieldLabel>Nome de usuário</FieldLabel>
                                <InputForm
                                    {...register("username")}
                                    type="text"
                                    placeholder="Nome de usuário"
                                />
                            </FormGroup>
                        </InputRow>

                        <InputRow>
                            <FormGroup>
                                <FieldLabel>E-mail</FieldLabel>
                                <InputForm
                                    {...register("email")}
                                    type="email"
                                    placeholder="E-mail"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FieldLabel>Senha</FieldLabel>
                                <InputForm
                                    {...register("password")}
                                    type="password"
                                    placeholder="Senha"
                                />
                            </FormGroup>
                        </InputRow>

                        <InputRow>
                            <FormGroup>
                                <FieldLabel>País de origem</FieldLabel>
                                <InputForm
                                    {...register("country")}
                                    type="text"
                                    placeholder="País de origem"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FieldLabel>Tipo de Usuario</FieldLabel>
                                <SelectForm {...register("userType")}>
                                    <option value="Reviewer">Reviewer</option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </SelectForm>
                            </FormGroup>
                        </InputRow>
                        <ButtonsRow>
                            <ButtonConfirm type="submit">
                                Confirmar
                            </ButtonConfirm>
                            <ButtonClose type="button" onClick={onClose}>
                                Cancelar
                            </ButtonClose>
                        </ButtonsRow>
                    </FormContent>
                </ModalContent>
            </ModalContainer>
        </ModalBackground>
    );
};

export default EditFormModal;
