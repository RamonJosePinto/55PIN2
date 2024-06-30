import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

function ReturnToPrevPage() {
    const navigate = useNavigate();

    const handleBackClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <BackToPrevPage href="#" onClick={handleBackClick}>
            {"<"} Voltar para página anterior
        </BackToPrevPage>
    );
}

export default ReturnToPrevPage;

const BackToPrevPage = styled.a`
    color: #3b3643;
    text-decoration: none;
    width: fit-content;
`;
