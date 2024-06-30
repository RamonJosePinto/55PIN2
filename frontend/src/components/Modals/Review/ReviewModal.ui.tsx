import React from "react";
import {
    ModalBackground,
    ModalContainer,
    CloseButton,
    HeaderModal,
    CloseIcon,
    HeaderTitle,
    ButtonConfirm,
    ButtonClose,
    FormContent,
    FormGroup,
    FieldLabel,
    TextArea,
    CharacterCount,
    ButtonsRow,
    NotaField,
    NotaInput,
    ErrorMessage,
} from "./ReviewModal.styles";
import closeIcon from "../../../assets/icons/icon-close.svg";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {postReview} from "../../../api/ApiService";

interface FormInputs {
    nota: number;
    texto: string;
}

const ReviewModal: React.FC<{
    onClose: () => void;
    albumId: number;
    userId: number;
}> = ({onClose, albumId, userId}) => {
    const maxLength = 300;

    const schema = yup.object().shape({
        nota: yup
            .number()
            .typeError("Por favor, insira um número válido")
            .min(0, "A nota deve ser pelo menos 0")
            .max(100, "A nota deve ser no máximo 100")
            .required("A nota é obrigatória"),
        texto: yup.string().required("O texto da review é obrigatório").min(100, "Deve ter um minimo de 100 caracteres").max(300, "Deve ter um máximo de 300 caracteres"),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm<FormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormInputs> = data => {
        const dataFormatted = {
            reviewer: userId,
            obra: albumId,
            ...data,
        };
        console.log({dataFormatted});
        postReview(dataFormatted);
        onClose();
    };

    const reviewText = watch("texto", "");

    return (
        <ModalBackground>
            <ModalContainer>
                <HeaderModal>
                    <HeaderTitle>Fazer Review</HeaderTitle>
                    <CloseButton onClick={onClose}>
                        <CloseIcon src={closeIcon} alt="Fechar" />
                    </CloseButton>
                </HeaderModal>
                <FormContent onSubmit={handleSubmit(onSubmit)}>
                    <NotaField>
                        <FieldLabel htmlFor="nota">Nota</FieldLabel>
                        <NotaInput type="number" id="nota" {...register("nota")} />
                        {errors.nota && <ErrorMessage>{errors.nota.message}</ErrorMessage>}
                    </NotaField>
                    <FormGroup>
                        <FieldLabel htmlFor="texto">Sua Review</FieldLabel>
                        <TextArea id="texto" rows={5} {...register("texto")} />
                        {errors.texto && <ErrorMessage>{errors.texto.message}</ErrorMessage>}
                        <CharacterCount>
                            {reviewText.length} / {maxLength}
                        </CharacterCount>
                    </FormGroup>
                    <ButtonsRow>
                        <ButtonConfirm type="submit">Enviar</ButtonConfirm>
                        <ButtonClose onClick={onClose}>Cancelar</ButtonClose>
                    </ButtonsRow>
                </FormContent>
            </ModalContainer>
        </ModalBackground>
    );
};

export default ReviewModal;
