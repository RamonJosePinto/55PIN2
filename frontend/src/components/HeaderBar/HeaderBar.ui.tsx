import React, {useState} from "react";
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
    TopBarContainer,
} from "./HeaderBar.styles";
import NotificationModal from "../Modals/Notification/NotificationModal.ui";

const TopBar: React.FC = () => {
    const [isNotificatioModalOpen, setIsNotificationModalOpen] =
        useState(false);

    const toggleNotificationModal = () => {
        setIsNotificationModalOpen(!isNotificatioModalOpen);
    };

    return (
        <TopBarContainer>
            <Container>
                <Row>
                    <MenuContainer>
                        <Menu>Seguidores</Menu>
                        <Menu>Seguidores</Menu>
                        <Menu>Seguidores</Menu>
                        <Menu>Seguidores</Menu>
                    </MenuContainer>
                    <ProfileNotificationContainer>
                        <NotificationIcon
                            src={NotificationBellIcon}
                            onClick={toggleNotificationModal}
                        />
                        <ProfileContainer>
                            {/* TODO: adicionar de um arquivo mock o nome e a foto */}
                            <ProfilePicture
                                src="src/assets/images/profile-pic.png"
                                alt="Profile"
                            />
                            <ProfileName>John</ProfileName>
                        </ProfileContainer>
                        <SearchBar type="text" placeholder="Buscar" />
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
