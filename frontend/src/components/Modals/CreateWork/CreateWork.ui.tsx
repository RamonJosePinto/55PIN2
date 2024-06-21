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
    TabsContainer,
    TabsList,
    Tab,
} from "./CreateWork.styles";
import closeIcon from "../../../assets/icons/icon-close.svg";
import AddDiscographyModal from "../AddDiscography/AddDiscographyModal.ui";
import {postAlbum, postPerformance} from "../../../api/ApiService";

interface CreateWorkModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface AlbumFormInputs {
    name: string;
    releaseYear: string;
    videoLink?: string;
    specialParticipations: string;
}

interface PerformanceFormInputs {
    title: string;
    releaseDate: string;
}

const CreateWorkModal: React.FC<CreateWorkModalProps> = ({isOpen, onClose}) => {
    const [discographies, setDiscographies] = useState<any[]>([]);
    const [isAddDiscographyModalOpen, setAddDiscographyModalOpen] =
        useState(false);
    const [activeTab, setActiveTab] = useState("Album");
    const {
        register: registerAlbum,
        handleSubmit: handleSubmitAlbum,
        reset: resetAlbumForm,
    } = useForm<AlbumFormInputs>();
    const {
        register: registerPerformance,
        handleSubmit: handleSubmitPerformance,
        reset: resetPerformanceForm,
    } = useForm<PerformanceFormInputs>();

    const handleAlbumSubmit: SubmitHandler<AlbumFormInputs> = data => {
        const dataFormatted = {
            autores: [{id: 1}], // Adicionar o ID correto aqui
            ...data,
            faixas: discographies,
        };
        postAlbum(dataFormatted)
            .then(() => {
                resetForms();
                onClose();
            })
            .catch(console.error);
    };

    const handlePerformanceSubmit: SubmitHandler<
        PerformanceFormInputs
    > = data => {
        const dataFormatted = {
            autores: [{id: 1}], // Adicionar o ID correto aqui
            titulo: data.title,
            dataLancamento: data.releaseDate,
            status: "APROVADA",
        };
        postPerformance(dataFormatted)
            .then(() => {
                resetForms();
                onClose();
            })
            .catch(console.error);
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
                                <Tab
                                    active={activeTab === "Album"}
                                    onClick={() => handleTabClick("Album")}
                                >
                                    Album
                                </Tab>
                                <Tab
                                    active={activeTab === "Performance"}
                                    onClick={() =>
                                        handleTabClick("Performance")
                                    }
                                >
                                    Performance
                                </Tab>
                            </TabsList>
                        </TabsContainer>
                        {activeTab === "Album" ? (
                            <FormContent
                                onSubmit={handleSubmitAlbum(handleAlbumSubmit)}
                            >
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
                                            <FieldLabel>
                                                Ano de Lançamento
                                            </FieldLabel>
                                            <InputForm
                                                {...registerAlbum(
                                                    "releaseYear",
                                                    {required: true}
                                                )}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FieldLabel>
                                                Link de Video (Opcional)
                                            </FieldLabel>
                                            <InputForm
                                                {...registerAlbum("videoLink")}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FieldLabel>
                                                Participações Especiais
                                            </FieldLabel>
                                            <InputForm
                                                {...registerAlbum(
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
                                    <ButtonConfirm type="submit">
                                        Confirmar
                                    </ButtonConfirm>
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
                                <AddDiscographyButton
                                    type="button"
                                    onClick={() =>
                                        setAddDiscographyModalOpen(true)
                                    }
                                >
                                    Adicionar Discografia
                                </AddDiscographyButton>
                            </FormContent>
                        ) : (
                            <FormContent
                                onSubmit={handleSubmitPerformance(
                                    handlePerformanceSubmit
                                )}
                            >
                                <InputRow>
                                    <div style={{flex: 1}}>
                                        <FormGroup>
                                            <FieldLabel>Título</FieldLabel>
                                            <InputForm
                                                {...registerPerformance(
                                                    "title",
                                                    {required: true}
                                                )}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FieldLabel>
                                                Data de Lançamento
                                            </FieldLabel>
                                            <InputForm
                                                {...registerPerformance(
                                                    "releaseDate",
                                                    {required: true}
                                                )}
                                            />
                                        </FormGroup>
                                    </div>
                                </InputRow>
                                <ButtonsRow>
                                    <ButtonConfirm type="submit">
                                        Confirmar
                                    </ButtonConfirm>
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
            <AddDiscographyModal
                onAddDiscography={handleAddDiscography}
                isOpen={isAddDiscographyModalOpen}
                onClose={() => setAddDiscographyModalOpen(false)}
            />
        </>
    );
};

export default CreateWorkModal;
