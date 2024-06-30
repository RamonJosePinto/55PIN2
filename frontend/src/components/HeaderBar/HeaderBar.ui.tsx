import React, {useContext, useState} from "react";
import {
    Container,
    DefaultProfileIcon,
    Menu,
    MenuContainer,
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
import defaultUserIcon from "../../assets/images/default-user.jfif";
import {logout} from "../../api/ApiService";

const TopBar: React.FC = () => {
    const [isNotificatioModalOpen, setIsNotificationModalOpen] = useState(false);

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

    return (
        <TopBarContainer>
            <Container>
                <Row>
                    <MenuContainer>
                        <Menu onClick={() => handleMenu("todos-albuns")}>Todos Albuns</Menu>
                        <Menu
                            onClick={() => {
                                logout(user.usuario.id);
                                localStorage.removeItem("user");
                                navigate("/");
                            }}
                        >
                            Logout
                        </Menu>
                    </MenuContainer>
                    <ProfileNotificationContainer>
                        <ProfileContainer onClick={() => navigate("/meus-dados")}>
                            {user.usuario.profilePicture ? <ProfilePicture src={user.usuario.profilePicture} alt="Profile" /> : <DefaultProfileIcon src={defaultUserIcon} />}
                            <ProfileName>{user?.usuario.username || "Anonimo"}</ProfileName>
                        </ProfileContainer>
                        <SearchBar type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Buscar" />
                        <SearchIconButton src={SearchIcon} onClick={handleSearch} />
                    </ProfileNotificationContainer>
                </Row>
            </Container>
            <NotificationModal isOpen={isNotificatioModalOpen} onClose={toggleNotificationModal} />
        </TopBarContainer>
    );
};

export default TopBar;
