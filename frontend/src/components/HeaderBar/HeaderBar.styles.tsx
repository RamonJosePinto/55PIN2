import styled from "styled-components";
import {ProfileDefaultIcon} from "../../pages/UserPage/UserPage.styles";

export const TopBarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 10px 20px;
`;

export const Menu = styled.div.attrs({})`
    font-weight: 500;
    cursor: pointer;
`;

export const SearchBar = styled.input`
    padding: 10px;
    border-radius: 50px;
    border: 1px solid #d0d0d0;
    background-color: #d0d0d0;

    &:focus-visible {
        outline: 2px solid #9747ff;
    }
`;

export const NotificationIcon = styled.img`
    margin: 0 10px;
    cursor: pointer;
    width: 25px;
    height: 25px;
`;

export const ProfilePicture = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
`;

export const Container = styled.div.attrs({
    className: "container",
})``;

export const ProfileNotificationContainer = styled.div.attrs({})`
    display: flex;
    align-items: center;
    gap: 30px;
`;

export const ProfileName = styled.div.attrs({})`
    color: #3b3643;
`;

export const ProfileContainer = styled.div.attrs({})`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
`;

export const MenuContainer = styled.div.attrs({})`
    display: flex;
    justify-content: space-between;
    gap: 50px;
`;

export const Row = styled.div.attrs({
    className: "",
})`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SearchIconButton = styled.img.attrs({
    className: "",
})`
    width: 25px;
    height: 25px;
    cursor: pointer;
`;

export const DefaultProfileIcon = styled(ProfileDefaultIcon).attrs({})`
    width: 40px;
    height: 40px;
`;
