import React from "react";
import styled from "styled-components";
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

const TopBar: React.FC = () => {
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
                        <NotificationIcon src={NotificationBellIcon} />
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
        </TopBarContainer>
    );
};

export default TopBar;
