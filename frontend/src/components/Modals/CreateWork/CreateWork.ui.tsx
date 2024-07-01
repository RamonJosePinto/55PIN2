import React, {useContext, useState} from "react";
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
    TabsContainer,
    TabsList,
    Tab,
} from "./CreateWork.styles";
import closeIcon from "../../../assets/icons/icon-close.svg";
import AddDiscographyModal from "../AddDiscography/AddDiscographyModal.ui";
import {postAlbum, postPerformance, validateAuthors} from "../../../api/ApiService";
import {UserContext} from "../../../hooks/UserContext";
import {Popup, PopupMessage} from "../../../pages/RegisterPage/RegisterPage.styles";

interface CreateWorkModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface AlbumFormInputs {
    name: string;
    releaseYear: string;
    autores: string;
    genero: string;
}

interface PerformanceFormInputs {
    title: string;
    releaseDate: string;
    url: string;
    autores: string;
    genero: string;
}

const CreateWorkModal: React.FC<CreateWorkModalProps> = ({isOpen, onClose}) => {
    const [discographies, setDiscographies] = useState<any[]>([]);
    const [isAddDiscographyModalOpen, setAddDiscographyModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Album");
    const {register: registerAlbum, handleSubmit: handleSubmitAlbum, reset: resetAlbumForm} = useForm<AlbumFormInputs>();
    const {register: registerPerformance, handleSubmit: handleSubmitPerformance, reset: resetPerformanceForm} = useForm<PerformanceFormInputs>();
    const [showPopup, setShowPopup] = useState(false);
    const {user} = useContext(UserContext);

    const handleAlbumSubmit: SubmitHandler<AlbumFormInputs> = async data => {
        try {
            const authorNames = data.autores.split(",").map(name => name.trim());
            const generosArray = data.genero.split(",").map(nome => ({nome: nome.trim()}));
            const response = await validateAuthors(authorNames);
            const authorIds = response.data.map((author: any) => ({id: author.id}));
            authorIds.push({id: user.usuario.id});
            const dataFormatted = {
                ...data,
                autores: authorIds,
                genero: generosArray,
                faixas: discographies,
            };
            console.log(dataFormatted);
            await postAlbum(dataFormatted);
            resetForms();
            onClose();
        } catch (error) {
            console.error("Error validating authors", error);
        }
    };

    const handlePerformanceSubmit: SubmitHandler<PerformanceFormInputs> = async data => {
        try {
            const authorNames = data.autores.split(",").map(name => name.trim());
            const generosArray = data.genero.split(",").map(nome => nome.trim());
            const response = await validateAuthors(authorNames);
            const authorIds = response.data.map((author: any) => ({id: author.id}));
            authorIds.push({id: user.usuario.id});
            const dataFormatted = {
                genero: generosArray,
                autores: authorIds,
                titulo: data.title,
                url: data.url,
                dataLancamento: data.releaseDate,
                status: "APROVADA",
            };
            await postPerformance(dataFormatted);
            resetForms();
            onClose();
            showSuccessPopup();
        } catch (error) {
            console.error("Error validating authors", error);
        }
    };

    const handleAddDiscography = (newDiscographies: any) => {
        setDiscographies(newDiscographies);
    };

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const resetForms = () => {
        resetAlbumForm();
        resetPerformanceForm();
        setDiscographies([]);
        setActiveTab("Album");
    };

    const showSuccessPopup = () => {
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <>
            <ModalBackground>
                <ModalContainer>
                    <ModalContent>
                        <HeaderModal>
                            <HeaderTitle>Criar Obra</HeaderTitle>
                            <CloseButton
                                onClick={() => {
                                    resetForms();
                                    onClose();
                                }}
                            >
                                <CloseIcon src={closeIcon} />
                            </CloseButton>
                        </HeaderModal>
                        <TabsContainer>
                            <TabsList>
                                <Tab active={activeTab === "Album"} onClick={() => handleTabClick("Album")}>
                                    Album
                                </Tab>
                                <Tab active={activeTab === "Performance"} onClick={() => handleTabClick("Performance")}>
                                    Performance
                                </Tab>
                            </TabsList>
                        </TabsContainer>
                        {activeTab === "Album" ? (
                            <FormContent onSubmit={handleSubmitAlbum(handleAlbumSubmit)}>
                                <InputRow>
                                    <div style={{flex: 1}}>
                                        <FormGroup>
                                            <FieldLabel>Nome</FieldLabel>
                                            <InputForm
                                                {...registerAlbum("name", {
                                                    required: true,
                                                })}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FieldLabel>Ano de Lançamento</FieldLabel>
                                            <InputForm {...registerAlbum("releaseYear", {required: true})} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FieldLabel>Gêneros (separados por vírgula)</FieldLabel>
                                            <InputForm {...registerAlbum("genero", {required: true})} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FieldLabel>Autores</FieldLabel>
                                            <InputForm {...registerAlbum("autores", {required: true})} placeholder="Digite os nomes dos autores separados por vírgula" />
                                        </FormGroup>
                                    </div>
                                    <ImageUploadContainer>
                                        <ImageUploadButton>Upload da Capa</ImageUploadButton>
                                    </ImageUploadContainer>
                                </InputRow>
                                <ButtonsRow>
                                    <ButtonConfirm type="submit">Confirmar</ButtonConfirm>
                                    <ButtonClose
                                        type="button"
                                        onClick={() => {
                                            resetForms();
                                            onClose();
                                        }}
                                    >
                                        Cancelar
                                    </ButtonClose>
                                </ButtonsRow>
                                <AddDiscographyButton type="button" onClick={() => setAddDiscographyModalOpen(true)}>
                                    Adicionar Discografia
                                </AddDiscographyButton>
                            </FormContent>
                        ) : (
                            <FormContent onSubmit={handleSubmitPerformance(handlePerformanceSubmit)}>
                                <InputRow>
                                    <div style={{flex: 1}}>
                                        <FormGroup>
                                            <FieldLabel>Título</FieldLabel>
                                            <InputForm {...registerPerformance("title", {required: true})} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FieldLabel>Data de Lançamento</FieldLabel>
                                            <InputForm {...registerPerformance("releaseDate", {required: true})} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FieldLabel>Link de Video (Opcional)</FieldLabel>
                                            <InputForm {...registerPerformance("url")} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FieldLabel>Gêneros (separados por vírgula)</FieldLabel>
                                            <InputForm {...registerPerformance("genero", {required: true})} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FieldLabel>Autores</FieldLabel>
                                            <InputForm {...registerPerformance("autores", {required: true})} placeholder="Digite os nomes dos autores separados por vírgula" />
                                        </FormGroup>
                                    </div>
                                </InputRow>
                                <ButtonsRow>
                                    <ButtonConfirm type="submit">Confirmar</ButtonConfirm>
                                    <ButtonClose
                                        type="button"
                                        onClick={() => {
                                            resetForms();
                                            onClose();
                                        }}
                                    >
                                        Cancelar
                                    </ButtonClose>
                                </ButtonsRow>
                            </FormContent>
                        )}
                    </ModalContent>
                </ModalContainer>
            </ModalBackground>
            <AddDiscographyModal onAddDiscography={handleAddDiscography} isOpen={isAddDiscographyModalOpen} onClose={() => setAddDiscographyModalOpen(false)} />
            {showPopup && (
                <Popup>
                    <PopupMessage>Obra cadastrada com sucesso!</PopupMessage>
                </Popup>
            )}
        </>
    );
};

export default CreateWorkModal;
