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
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
} from "./AddDiscographyModal.styles";
import closeIcon from "../../../assets/icons/icon-close.svg";

interface AddDiscographyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddDiscography: (discography: any) => void;
}

interface FormInputs {
    titulo: string;
    numero: number;
    segundos: number;
}

const AddDiscographyModal: React.FC<AddDiscographyModalProps> = ({isOpen, onClose, onAddDiscography}) => {
    const {register, handleSubmit, reset} = useForm<FormInputs>();
    const [discography, setDiscography] = useState<any[]>([]);

    const onSubmit: SubmitHandler<FormInputs> = data => {
        setDiscography([...discography, data]);
        reset();
    };

    const handleConfirm = () => {
        onAddDiscography(discography);
        onClose();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalBackground>
            <ModalContainer>
                <ModalContent>
                    <HeaderModal>
                        <HeaderTitle>Adicionar Discografia</HeaderTitle>
                        <CloseButton onClick={handleClose}>
                            <CloseIcon src={closeIcon} />
                        </CloseButton>
                    </HeaderModal>
                    <FormContent onSubmit={handleSubmit(onSubmit)}>
                        <InputRow>
                            <div style={{flex: 1}}>
                                <FormGroup>
                                    <FieldLabel>Título</FieldLabel>
                                    <InputForm
                                        {...register("titulo", {
                                            required: true,
                                        })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FieldLabel>Número</FieldLabel>
                                    <InputForm
                                        {...register("numero", {
                                            required: true,
                                        })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FieldLabel>Duração (Segundos)</FieldLabel>
                                    <InputForm
                                        {...register("segundos", {
                                            required: true,
                                        })}
                                    />
                                </FormGroup>
                            </div>
                            {discography.length > 0 && (
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableHeader>Número</TableHeader>
                                            <TableHeader>Título</TableHeader>
                                            <TableHeader>Duração</TableHeader>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {discography.map((track, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{track.numero}</TableCell>
                                                <TableCell>{track.titulo}</TableCell>
                                                <TableCell>{track.segundos}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </InputRow>
                        <ButtonsRow>
                            <ButtonConfirm type="submit">Adicionar Faixa</ButtonConfirm>
                            <ButtonClose type="button" onClick={handleClose}>
                                Cancelar
                            </ButtonClose>
                        </ButtonsRow>
                    </FormContent>
                    <ButtonsRow>
                        <ButtonConfirm type="button" onClick={handleConfirm}>
                            Confirmar
                        </ButtonConfirm>
                    </ButtonsRow>
                </ModalContent>
            </ModalContainer>
        </ModalBackground>
    );
};

export default AddDiscographyModal;
