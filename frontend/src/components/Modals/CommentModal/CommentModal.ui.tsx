import React from "react";
import {
    ModalBackground,
    ModalContainer,
    CloseButton,
    HeaderModal,
    HeaderTitle,
    FormContent,
    TextArea,
    CharacterCount,
    ButtonConfirm,
    ButtonClose,
    ErrorMessage,
    ButtonsContainer,
} from "./CommentModal.styles";
import closeIcon from "../../../assets/icons/icon-close.svg";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm, SubmitHandler} from "react-hook-form";
import {postComment} from "../../../api/ApiService";

interface FormInputs {
    texto: string;
}

const CommentModal: React.FC<{
    onClose: () => void;
    reviewId: number;
    userId: number;
}> = ({onClose, userId, reviewId}) => {
    const schema = yup.object().shape({
        texto: yup.string().required("O texto do comentário é obrigatório").min(100, "Deve ter um mínimo de 100 caracteres").max(300, "Deve ter um máximo de 300 caracteres"),
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
            review: reviewId,
            usuario: userId,
            texto: data.texto,
        };
        postComment(dataFormatted);
        onClose();
    };

    const commentText = watch("texto", "");

    return (
        <ModalBackground>
            <ModalContainer>
                <HeaderModal>
                    <HeaderTitle>Fazer Comentário</HeaderTitle>
                    <CloseButton onClick={onClose}>
                        <img src={closeIcon} alt="Fechar" />
                    </CloseButton>
                </HeaderModal>
                <FormContent onSubmit={handleSubmit(onSubmit)}>
                    <TextArea rows={5} {...register("texto")} />
                    {errors.texto && <ErrorMessage>{errors.texto.message}</ErrorMessage>}
                    <CharacterCount>{commentText.length} / 300</CharacterCount>
                    <ButtonsContainer>
                        <ButtonConfirm type="submit">Enviar</ButtonConfirm>
                        <ButtonClose type="button" onClick={onClose}>
                            Cancelar
                        </ButtonClose>
                    </ButtonsContainer>
                </FormContent>
            </ModalContainer>
        </ModalBackground>
    );
};

export default CommentModal;
