import React, {useState} from "react";
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
    TextAreaForm,
} from "./EditFormModal.styles";

import userDataMock from "../../../mocks/userData.mock.json";
import closeIcon from "../../../assets/icons/icon-close.svg";
import {getUser, putUser, uploadUserImage} from "../../../api/ApiService";
import defaultUserIcon from "../../../assets/images/default-user.jfif";

interface EditFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: any;
}

interface FormInputs {
    nome: string;
    username: string;
    email: string;
    senha: string;
    pais: string;
    tipo: string;
    biografia: string;
}

const EditFormModal: React.FC<EditFormModalProps> = ({isOpen, onClose, userData}) => {
    const {register, handleSubmit, reset} = useForm<FormInputs>({
        defaultValues: userDataMock,
    });

    const [userFormData, setUserFormData] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    React.useEffect(() => {
        getUser(userData?.usuario.id)
            .then(res => {
                setUserFormData(res.data);
                console.log(res);
            })
            .catch(err => console.log(err));

        reset(userFormData); // Reset form with mock data when modal opens
    }, [reset, isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const onSubmit: SubmitHandler<FormInputs> = async data => {
        try {
            await putUser(userData.usuario.id, data);
            if (selectedImage) {
                await uploadUserImage(userData.usuario.id, selectedImage);
            }
            window.alert("Perfil atualizado com sucesso!");
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar perfil", error);
            window.alert("Erro ao atualizar perfil");
        }
    };

    console.log({userFormData});

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
                        <ActualUserImage src={userFormData.caminhoImagem ? `..\\..\\assets\\userImages\\${userFormData.caminhoImagem}` : defaultUserIcon} />
                        <EditImage>
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                        </EditImage>
                    </ImageEditContainer>

                    <FormContent onSubmit={handleSubmit(onSubmit)}>
                        <InputRow>
                            <FormGroup>
                                <FieldLabel>Nome Completo</FieldLabel>
                                <InputForm {...register("nome")} type="text" placeholder="Nome completo" />
                            </FormGroup>

                            <FormGroup>
                                <FieldLabel>Nome de usuário</FieldLabel>
                                <InputForm {...register("username")} type="text" placeholder="Nome de usuário" />
                            </FormGroup>
                        </InputRow>

                        <InputRow>
                            <FormGroup>
                                <FieldLabel>E-mail</FieldLabel>
                                <InputForm {...register("email")} type="email" placeholder="E-mail" />
                            </FormGroup>

                            <FormGroup>
                                <FieldLabel>Senha</FieldLabel>
                                <InputForm {...register("senha")} type="password" placeholder="Senha" />
                            </FormGroup>
                        </InputRow>

                        <InputRow>
                            <FormGroup>
                                <FieldLabel>País de origem</FieldLabel>
                                <InputForm {...register("pais")} type="text" placeholder="País de origem" />
                            </FormGroup>
                            <FormGroup>
                                <FieldLabel>Tipo de Usuario</FieldLabel>
                                <SelectForm {...register("tipo")}>
                                    <option value="REVIEWER">REVIEWER</option>
                                    <option value="ARTISTA">ARTISTA</option>
                                </SelectForm>
                            </FormGroup>
                        </InputRow>
                        <InputRow>
                            <FormGroup>
                                <FieldLabel>Biografia</FieldLabel>
                                <TextAreaForm {...register("biografia")} placeholder="Biografia" />
                            </FormGroup>
                        </InputRow>
                        <ButtonsRow>
                            <ButtonConfirm type="submit">Confirmar</ButtonConfirm>
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
