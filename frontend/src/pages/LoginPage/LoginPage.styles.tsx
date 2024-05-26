import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 100vh;
`;

export const LeftSide = styled.div`
    flex: 1;
    background: url("src/assets/images/login-background.png") no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const RightSide = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
`;

export const Title = styled.h1`
    color: #fff;
    font-size: 36px;
    text-align: center;
`;

export const Subtitle = styled.h2`
    font-size: 32px;
    margin-bottom: 40px;
    color: #363843;
    text-align: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #eaeaed;
    border-radius: 4px;
    width: 350px;
`;

export const Button = styled.button.attrs({
    className: "btn btn-primary",
})`
    padding: 10px;
    font-size: 24px;
    background-color: #29b56b;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 50px;
    margin-bottom: 15px;
    width: 80%;
    font-weight: 600 !important;

    &:hover {
        background-color: #28a745;
    }

    &:focus-visible {
        background-color: #307f42 !important;
    }

    &:active {
        background-color: #307f42 !important;
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

export const LinkRow = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 12px;
    justify-content: center;
`;

export const FormContainer = styled.div`
    border: 1px solid #eaeaed;
    padding: 40px 100px;
    background-color: #fff;
    border-radius: 5px;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const InputTitle = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #363843;
`;
