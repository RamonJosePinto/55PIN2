import styled from "styled-components";

function OutlineButton({
    children,
    ...props
}: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}) {
    return <OutlinedButton {...props}>{children}</OutlinedButton>;
}

export default OutlineButton;

export const OutlinedButton = styled.button.attrs(props => ({
    type: props.type || "button",
}))`
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #fff;
    border: 2px solid #9747ff;

    &:hover {
        background-color: #9747ff;
        border-color: #9747ff;
        color: #fff;
    }

    &:focus-visible {
        background-color: #7431cb !important;
        border-color: #7431cb !important;
    }

    &:active {
        background-color: #7431cb !important;
        border-color: #7431cb !important;
    }
`;

export const Link = styled.a`
    color: #9747ff;
    font-weight: 600;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
