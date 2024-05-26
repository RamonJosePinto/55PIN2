import React, {useEffect, useState} from "react";
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

const UserPage: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("Albuns");

    useEffect(() => {
        setUserData(mockData);
    }, []);

    if (!userData) return <div>Loading...</div>;

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
                            <UserName>{userData?.name}</UserName>
                            <UserType color={"#398ecc"}>
                                {userData?.profileType}
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
                                <ButtonProfile>Editar perfil</ButtonProfile>
                                <ButtonProfile>Editar foto</ButtonProfile>
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
                        <CarouselTitle>Mais Recentes</CarouselTitle>
                        <CustomSlider {...settings}>
                            {/* TODO: fazer o titulo vir pelo mock  */}
                            {userData.albums.mostRecent.map(
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
                    </CarouselItem>

                    <CarouselItem>
                        <CarouselTitle>Mais Avaliados</CarouselTitle>
                        <CustomSlider {...settings}>
                            {/* TODO: fazer o titulo vir pelo mock  */}
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
                    </CarouselItem>
                </CarouselContainer>
            </Container>
        </>
    );
};

export default UserPage;
