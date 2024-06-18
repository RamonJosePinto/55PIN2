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
    ButtonsRow,
    FormGroup,
    FieldLabel,
    ImageUploadContainer,
    ImageUploadButton,
    AddDiscographyButton,
} from "./CreateWork.styles";
import closeIcon from "../../../assets/icons/icon-close.svg";
import AddDiscographyModal from "../AddDiscography/AddDiscographyModal.ui";

interface CreateWorkModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormInputs {
    name: string;
    releaseYear: string;
    videoLink?: string;
    specialParticipations: string;
}

const CreateWorkModal: React.FC<CreateWorkModalProps> = ({isOpen, onClose}) => {
    const {register, handleSubmit} = useForm<FormInputs>();
    const [isAddDiscographyModalOpen, setAddDiscographyModalOpen] =
        useState(false);

    const onSubmit: SubmitHandler<FormInputs> = data => {
        console.log(data);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <ModalBackground>
                <ModalContainer>
                    <ModalContent>
                        <HeaderModal>
                            <HeaderTitle>Criar Obra</HeaderTitle>
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
                                            {...register("name", {
                                                required: true,
                                            })}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FieldLabel>
                                            Ano de Lançamento
                                        </FieldLabel>
                                        <InputForm
                                            {...register("releaseYear", {
                                                required: true,
                                            })}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FieldLabel>
                                            Link de Video (Opcional)
                                        </FieldLabel>
                                        <InputForm {...register("videoLink")} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FieldLabel>
                                            Participações Especiais
                                        </FieldLabel>
                                        <InputForm
                                            {...register(
                                                "specialParticipations",
                                                {required: true}
                                            )}
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
                            <AddDiscographyButton
                                onClick={() => setAddDiscographyModalOpen(true)}
                            >
                                Adicionar Discografia
                            </AddDiscographyButton>
                        </FormContent>
                    </ModalContent>
                </ModalContainer>
            </ModalBackground>
            <AddDiscographyModal
                isOpen={isAddDiscographyModalOpen}
                onClose={() => setAddDiscographyModalOpen(false)}
            />
        </>
    );
};

export default CreateWorkModal;
