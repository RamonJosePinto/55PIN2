import React, {useContext, useEffect, useState} from "react";
import TopBar from "../../components/HeaderBar/HeaderBar.ui";
import {
    Container,
    UserInfoContainer,
    UserProfile,
    UserDetails,
    UserStats,
    AlbumsSection,
    Album,
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
    ActiveTab,
    TabsList,
} from "./UserPage.styles";
import mockData from "../../mocks/user.mock.json";
import ReturnToPrevPage from "../../components/Navigate/ReturnToPrevPage.ui";
import EditFormModal from "../../components/Modals/UserEditForm/EditFormModal.ui";
import CreateWorkModal from "../../components/Modals/CreateWork/CreateWork.ui";
import {UserContext} from "../../hooks/UserContext";
import defaultAlbumImage from "../../assets/images/default-cover.png";
import {
    getUser,
    getUserAlbuns,
    postAlbum,
    postUser,
} from "../../api/ApiService";
import {useNavigate} from "react-router-dom";

const UserPage: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [albumData, setAlbumData] = useState<any>([]);
    const [activeTab, setActiveTab] = useState("Albuns");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateWorkModalOpen, setIsCreateWorkModalOpen] = useState(false); // Novo estado
    const {user} = useContext(UserContext);

    useEffect(() => {
        // setUserData(mockData);
        getUser(user.id).then((res: any) => {
            setUserData(res.data);
        });
    }, []);

    useEffect(() => {
        getUserAlbuns(user.id).then((res: any) => {
            setAlbumData(res.data);
        });
    }, [userData]);

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
                <ReturnToPrevPage url="/" />
                <UserInfoContainer>
                    <UserProfile>
                        <UserPicture
                            src={userData.profilePicture}
                            alt="Profile"
                        />
                        <UserInfo>
                            <UserName>{userData?.username}</UserName>
                            <UserType color={"#398ecc"}>
                                {userData?.tipo}
                            </UserType>
                            <UserStats>
                                <UserStatsItem>
                                    <UserStatsNumber>
                                        {userData.followers}
                                    </UserStatsNumber>
                                    Seguidores
                                </UserStatsItem>
                                <UserStatsItem>
                                    <UserStatsNumber>
                                        {userData.following}
                                    </UserStatsNumber>
                                    Seguindo
                                </UserStatsItem>
                                <UserStatsItem>
                                    <UserStatsNumber>
                                        {userData.likes}
                                    </UserStatsNumber>{" "}
                                    Curtiu
                                </UserStatsItem>
                            </UserStats>
                            <UserInfoButton>
                                <ButtonProfile
                                    onClick={handleEditNotificationClick}
                                >
                                    Editar perfil
                                </ButtonProfile>
                                <ButtonProfile onClick={handleCreateWorkClick}>
                                    Criar Obra
                                </ButtonProfile>
                            </UserInfoButton>
                        </UserInfo>
                    </UserProfile>
                    <DividerFull />
                    <UserDetails>
                        <FirstColumn>
                            <DetailTitle>Reviews</DetailTitle>
                            <DetailTable>
                                <DetailRow>
                                    {/* TODO: fazer vir isso do mock */}
                                    <DetailInfo>
                                        Quantidade de Reviews:{" "}
                                    </DetailInfo>
                                    <DetailValue>
                                        {mockData.reviews}
                                    </DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    {/* TODO: fazer vir isso do mock */}
                                    <DetailInfo>Média de Reviews: </DetailInfo>
                                    <DetailValue>
                                        {mockData.reviewMedia}
                                    </DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    {/* TODO: fazer vir isso do mock */}
                                    <DetailInfo>Outra informação: </DetailInfo>
                                    <DetailValue>
                                        {mockData.exampleInfo1}
                                    </DetailValue>
                                </DetailRow>
                            </DetailTable>
                        </FirstColumn>
                        <NormalDivider />
                        <SecondColumn>
                            <DetailTitle>Comentários</DetailTitle>
                            <DetailTable>
                                <DetailRow>
                                    {/* TODO: fazer vir isso do mock */}
                                    <DetailInfo>
                                        Quantidade de Comentários:{" "}
                                    </DetailInfo>
                                    <DetailValue>
                                        {mockData.comments}
                                    </DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    {/* TODO: fazer vir isso do mock */}
                                    <DetailInfo>
                                        Outra informação01:{" "}
                                    </DetailInfo>
                                    <DetailValue>
                                        {mockData.exampleInfo2}
                                    </DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    {/* TODO: fazer vir isso do mock */}
                                    <DetailInfo>
                                        Outra informação02:{" "}
                                    </DetailInfo>
                                    <DetailValue>
                                        {mockData.exampleInfo3}
                                    </DetailValue>
                                </DetailRow>
                            </DetailTable>
                        </SecondColumn>
                    </UserDetails>
                </UserInfoContainer>

                <CarouselContainer>
                    <TabsContainer>
                        <TabsList>
                            <Tab
                                active={activeTab === "Albuns"}
                                onClick={() => handleTabClick("Albuns")}
                            >
                                Albuns
                            </Tab>
                            <Tab
                                active={activeTab === "Participações"}
                                onClick={() => handleTabClick("Participações")}
                            >
                                Participações
                            </Tab>
                            <Tab
                                active={activeTab === "Colaborações"}
                                onClick={() => handleTabClick("Colaborações")}
                            >
                                Colaborações
                            </Tab>
                        </TabsList>
                    </TabsContainer>
                    <CarouselItem>
                        <CarouselTitle>Albuns do Usuario</CarouselTitle>
                        <CustomSlider {...settings}>
                            {albumData?.map((album: any, index: number) => (
                                <div key={index}>
                                    <AlbumImage
                                        onClick={() =>
                                            navigate(`/obra/${album.id}`)
                                        }
                                        src={
                                            album.urlImagemCapa ||
                                            defaultAlbumImage
                                        }
                                        alt={album.titulo}
                                    />
                                    <AlbumTitle>{album.titulo}</AlbumTitle>
                                    <AlbumDate>
                                        {album.dataLancamento}
                                    </AlbumDate>
                                </div>
                            ))}
                        </CustomSlider>
                    </CarouselItem>

                    {/* <CarouselItem>
                        <CarouselTitle>Mais Avaliados</CarouselTitle>
                        <CustomSlider {...settings}>
                          
                            {userData.albums.topRated.map(
                                (album: any, index: number) => (
                                    <div key={index}>
                                        <AlbumImage
                                            src={album.cover}
                                            alt={album.title}
                                        />
                                        <AlbumTitle>{album.title}</AlbumTitle>
                                        <AlbumDate>
                                            {album.releaseDate}
                                        </AlbumDate>
                                    </div>
                                )
                            )}
                        </CustomSlider>
                    </CarouselItem> */}
                </CarouselContainer>
            </Container>
            <EditFormModal
                userData={user}
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
            />
            <CreateWorkModal
                onCreate={handleCreateWork}
                isOpen={isCreateWorkModalOpen}
                onClose={handleCloseCreateWorkModal}
            />
        </>
    );
};

export default UserPage;
