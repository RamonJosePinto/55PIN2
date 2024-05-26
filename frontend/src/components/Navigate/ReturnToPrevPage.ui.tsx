import styled from "styled-components";

function ReturnToPrevPage({url}: {url: string}) {
    return (
        <BackToPrevPage href={url}>
            {"<"} Voltar para página anterior
        </BackToPrevPage>
    );
}

export default ReturnToPrevPage;

const BackToPrevPage = styled.a`
    color: #3b3643;
    text-decoration: none;
`;
