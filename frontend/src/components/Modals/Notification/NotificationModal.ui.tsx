import React, {useState} from "react";
import {
    ModalOverlay,
    ModalContainer,
    ModalHeader,
    ModalTitle,
    MarkAllAsReadButton,
    NotificationItem,
    NotificationList,
    NotificationText,
    NotificationTime,
    ProfilePicture,
    AlingEnd,
    NotificationRow,
    UnreadNotification,
    NotificationDescription,
    NotificationUserName,
} from "./NotificationModal.styles";
import closeIcon from "../../../assets/icons/icon-close.svg";

import notifications from "../../../mocks/notification.mock.json";
import {CloseButton, CloseIcon} from "../UserEditForm/EditFormModal.styles";

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose,
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle>Notificações</ModalTitle>
                    <CloseButton onClick={onClose}>
                        <CloseIcon src={closeIcon} />
                    </CloseButton>
                </ModalHeader>
                <NotificationList>
                    <AlingEnd>
                        <MarkAllAsReadButton onClick={onClose}>
                            Marcar todas como lidas
                        </MarkAllAsReadButton>
                    </AlingEnd>
                    {notifications.map(notification => (
                        <NotificationItem key={notification.id}>
                            <ProfilePicture
                                src={notification.profilePicture}
                                alt="Profile"
                            />
                            <NotificationRow>
                                <NotificationText>
                                    <NotificationUserName>
                                        {notification.user}
                                    </NotificationUserName>{" "}
                                    <NotificationDescription>
                                        {notification.action}
                                    </NotificationDescription>
                                </NotificationText>
                                <NotificationTime>
                                    {notification.time}
                                </NotificationTime>
                            </NotificationRow>
                            {notification.unread && <UnreadNotification />}
                        </NotificationItem>
                    ))}
                </NotificationList>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default NotificationModal;
