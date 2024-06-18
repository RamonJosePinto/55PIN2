import React, {useState} from "react";
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
} from "./ReviewModal.styles";
import closeIcon from "../../../assets/icons/icon-close.svg";

const ReviewModal: React.FC<{onClose: () => void}> = ({onClose}) => {
    const [reviewText, setReviewText] = useState("");
    const maxLength = 300;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para enviar a review
        console.log("Review enviada:", reviewText);
        onClose();
    };

    return (
        <ModalBackground>
            <ModalContainer>
                <HeaderModal>
                    <HeaderTitle>Fazer Review</HeaderTitle>
                    <CloseButton onClick={onClose}>
                        <CloseIcon src={closeIcon} alt="Fechar" />
                    </CloseButton>
                </HeaderModal>
                <FormContent onSubmit={handleSubmit}>
                    <FormGroup>
                        <FieldLabel htmlFor="review">Sua Review</FieldLabel>
                        <TextArea
                            id="review"
                            value={reviewText}
                            onChange={handleChange}
                            maxLength={maxLength}
                            rows={5}
                        />
                        <CharacterCount>
                            {reviewText.length} / {maxLength}
                        </CharacterCount>
                    </FormGroup>
                    <ButtonsRow>
                        <ButtonConfirm>Enviar</ButtonConfirm>
                        <ButtonClose onClick={onClose}>Cancelar</ButtonClose>
                    </ButtonsRow>
                </FormContent>
            </ModalContainer>
        </ModalBackground>
    );
};

export default ReviewModal;
