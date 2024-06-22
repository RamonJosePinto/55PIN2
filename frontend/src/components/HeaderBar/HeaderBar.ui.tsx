import React, {useContext, useState} from "react";
import NotificationBellIcon from "../../assets/icons/notification-icon.svg";
import {
    Container,
    Menu,
    MenuContainer,
    NotificationIcon,
    ProfileContainer,
    ProfileName,
    ProfileNotificationContainer,
    ProfilePicture,
    Row,
    SearchBar,
    SearchIconButton,
    TopBarContainer,
} from "./HeaderBar.styles";
import NotificationModal from "../Modals/Notification/NotificationModal.ui";
import {useNavigate} from "react-router-dom";
import SearchIcon from "../../assets/icons/icon-search.svg";
import {UserContext} from "../../hooks/UserContext";

const TopBar: React.FC = () => {
    const [isNotificatioModalOpen, setIsNotificationModalOpen] =
        useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/list/${searchTerm}`);
        }
    };

    const handleMenu = (term: string) => {
        navigate(`/list/${term}`);
    };

    const toggleNotificationModal = () => {
        setIsNotificationModalOpen(!isNotificatioModalOpen);
    };

    console.log({user});

    return (
        <TopBarContainer>
            <Container>
                <Row>
                    <MenuContainer>
                        <Menu onClick={() => handleMenu("todos-albuns")}>
                            Todos Albuns
                        </Menu>
                        <Menu>Seguidores</Menu>
                        <Menu>Seguidores</Menu>
                        <Menu>Seguidores</Menu>
                    </MenuContainer>
                    <ProfileNotificationContainer>
                        <NotificationIcon
                            src={NotificationBellIcon}
                            onClick={toggleNotificationModal}
                        />
                        <ProfileContainer
                            onClick={() => navigate("/meus-dados")}
                        >
                            {/* TODO: adicionar de um arquivo mock o nome e a foto */}
                            <ProfilePicture
                                src="src/assets/images/profile-pic.png"
                                alt="Profile"
                            />
                            <ProfileName>{user?.name || "Anonimo"}</ProfileName>
                        </ProfileContainer>
                        <SearchBar
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Buscar"
                        />
                        <SearchIconButton
                            src={SearchIcon}
                            onClick={handleSearch}
                        />
                    </ProfileNotificationContainer>
                </Row>
            </Container>
            <NotificationModal
                isOpen={isNotificatioModalOpen}
                onClose={toggleNotificationModal}
            />
        </TopBarContainer>
    );
};

export default TopBar;
