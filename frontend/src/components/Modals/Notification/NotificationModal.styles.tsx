import styled from "styled-components";
import {OutlinedButton} from "../../Buttons/OutlineButton.ui";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    width: 750px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eaeaed;
    padding: 15px 50px;
    justify-content: space-between;
`;

export const ModalTitle = styled.h2`
    margin: 0;
    color: #3b3643;
    font-weight: 600;
`;

export const MarkAllAsReadButton = styled(OutlinedButton)`
    /* background: none; */
    /* border: none; */
    /* color: #6c63ff; */
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 10px;
`;

export const NotificationList = styled.div`
    max-height: 830px;
    min-height: 830px;
    overflow-y: auto;
    padding: 20px 50px;
    gap: 10px;
    display: flex;
    flex-direction: column;
`;

export const NotificationItem = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border: 1px solid #eee;
    border-radius: 10px;
`;

export const ProfilePicture = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
`;

export const NotificationText = styled.div`
    flex: 1;
    display: flex;
    gap: 5px;
    font-size: 14px;
`;

export const NotificationTime = styled.div`
    font-size: 12px;
    color: #7b7b7b;
    font-weight: 500;
    font-size: 14px;
`;

export const AlingEnd = styled.div`
    display: flex;
    justify-content: end;
`;

export const NotificationRow = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1px;
`;

export const NotificationUserName = styled.strong`
    color: #3b3643;
    font-weight: 600;
`;

export const NotificationDescription = styled.div`
    color: #7b7b7b;
    font-weight: 500;
`;

export const UnreadNotification = styled.div`
    width: 15px;
    height: 15px;
    background-color: #29b56b;
    border-radius: 50%;
    align-self: start;
`;
