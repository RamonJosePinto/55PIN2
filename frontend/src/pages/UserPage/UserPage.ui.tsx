import React, {useContext, useEffect, useState} from "react";
import TopBar from "../../components/HeaderBar/HeaderBar.ui";
import {
    Container,
    UserInfoContainer,
    UserProfile,
    UserDetails,
    UserStats,
    UserInfo,
    UserName,
    UserInfoButton,
    UserPicture,
    ButtonProfile,
    UserType,
    UserStatsItem,
    UserStatsNumber,
    FirstColumn,
    SecondColumn,
    DetailTitle,
    DividerFull,
    NormalDivider,
    DetailTable,
    DetailRow,
    DetailInfo,
    DetailValue,
    AlbumImage,
    CarouselContainer,
    CustomSlider,
    AlbumTitle,
    CarouselTitle,
    AlbumDate,
    CarouselItem,
    TabsContainer,
    Tab,
    TabsList,
    ProfileDefaultIcon,
} from "./UserPage.styles";
import mockData from "../../mocks/user.mock.json";
import ReturnToPrevPage from "../../components/Navigate/ReturnToPrevPage.ui";
import EditFormModal from "../../components/Modals/UserEditForm/EditFormModal.ui";
import CreateWorkModal from "../../components/Modals/CreateWork/CreateWork.ui";
import {UserContext} from "../../hooks/UserContext";
import defaultAlbumImage from "../../assets/images/default-cover.png";
import defaultUserIcon from "../../assets/images/default-user.jfif";
import {getUser, getUserAlbuns, getUserPerformances, postAlbum} from "../../api/ApiService";
import {useNavigate} from "react-router-dom";

const UserPage: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [obraData, setobraData] = useState<any>([]);
    const [activeTab, setActiveTab] = useState("Albuns");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateWorkModalOpen, setIsCreateWorkModalOpen] = useState(false);
    const {user} = useContext(UserContext);

    console.log({userData});

    useEffect(() => {
        getUser(user.usuario.id).then((res: any) => {
            setUserData(res.data);
        });
    }, []);

    useEffect(() => {
        if (activeTab === "Albuns") {
            getUserAlbuns(user.usuario.id).then((res: any) => {
                setobraData(res.data);
            });
        } else {
            getUserPerformances(user.usuario.id).then((res: any) => {
                setobraData(res.data);
            });
        }
    }, [userData, activeTab]);

    const navigate = useNavigate();

    if (!userData) return <div>Loading...</div>;

    const handleEditNotificationClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleCreateWorkClick = () => {
        setIsCreateWorkModalOpen(true);
    };

    const handleCloseCreateWorkModal = () => {
        setIsCreateWorkModalOpen(false);
    };

    const handleCreateWork = (data: any) => {
        const dataFormated = {
            autores: [{id: userData.id}],
            ...data,
        };
        console.log({dataFormated});
        postAlbum(dataFormated)
            .then(response => {
                console.log("Album criado com sucesso", response);
            })
            .catch(error => {
                console.error("Erro ao criar album", error);
            });
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <>
            <TopBar />
            <Container>
                <ReturnToPrevPage />
                <UserInfoContainer>
                    <UserProfile>
                        {userData.caminhoImagem ? (
                            <UserPicture src={`../../assets/userImages/${userData.caminhoImagem}`.replace(/\\/g, "/")} alt="Profile" />
                        ) : (
                            <ProfileDefaultIcon src={defaultUserIcon} />
                        )}
                        <UserInfo>
                            <UserName>{userData?.username}</UserName>
                            <UserType color={"#398ecc"}>{userData?.tipo}</UserType>
                            <UserStats>
                                <UserStatsItem>
                                    <UserStatsNumber>{obraData.length}</UserStatsNumber>
                                    Obras
                                </UserStatsItem>
                            </UserStats>
                            <UserInfoButton>
                                <ButtonProfile onClick={handleEditNotificationClick}>Editar perfil</ButtonProfile>
                                <ButtonProfile onClick={handleCreateWorkClick}>Criar Obra</ButtonProfile>
                            </UserInfoButton>
                        </UserInfo>
                    </UserProfile>
                    <DividerFull />
                    <UserDetails>
                        <FirstColumn>
                            <DetailTitle>Informações</DetailTitle>
                            <DetailTable>
                                <DetailRow>
                                    <DetailInfo>Nome completo: </DetailInfo>
                                    <DetailValue>{userData?.nome}</DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailInfo>Pais: </DetailInfo>
                                    <DetailValue>{userData?.pais}</DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailInfo>Email: </DetailInfo>
                                    <DetailValue>{userData?.email}</DetailValue>
                                </DetailRow>
                            </DetailTable>
                        </FirstColumn>
                        <NormalDivider />
                    </UserDetails>
                </UserInfoContainer>

                <CarouselContainer>
                    <TabsContainer>
                        <TabsList>
                            <Tab active={activeTab === "Albuns"} onClick={() => handleTabClick("Albuns")}>
                                Albuns
                            </Tab>
                            <Tab active={activeTab === "Performances"} onClick={() => handleTabClick("Performances")}>
                                Performances
                            </Tab>
                        </TabsList>
                    </TabsContainer>
                    {obraData.length > 0 ? (
                        <CarouselItem>
                            <CarouselTitle>{activeTab === "Albuns" ? "Albuns do Usuario" : "Performances do Usuario"}</CarouselTitle>
                            <CustomSlider {...settings}>
                                {obraData?.map((album: any, index: number) => (
                                    <div key={index}>
                                        <AlbumImage
                                            onClick={() => navigate(`/obra/${album.id}`, {state: {type: activeTab === "Albuns" ? "Albuns" : "Performances"}})}
                                            src={album.urlImagemCapa || defaultAlbumImage}
                                            alt={album.titulo}
                                        />
                                        <AlbumTitle>{album.titulo}</AlbumTitle>
                                        <AlbumDate>{album.dataLancamento}</AlbumDate>
                                    </div>
                                ))}
                            </CustomSlider>
                        </CarouselItem>
                    ) : (
                        <div style={{textAlign: "center"}}>Sem {activeTab.toLowerCase()} cadastradas desse usuario</div>
                    )}
                </CarouselContainer>
            </Container>
            <EditFormModal userData={user} isOpen={isEditModalOpen} onClose={handleCloseEditModal} />
            {/* @ts-ignore */}
            <CreateWorkModal onCreate={handleCreateWork} isOpen={isCreateWorkModalOpen} onClose={handleCloseCreateWorkModal} />
        </>
    );
};

export default UserPage;
