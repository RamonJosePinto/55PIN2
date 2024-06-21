import styled from "styled-components";
import {OutlinedButton} from "../../components/Buttons/OutlineButton.ui";

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

export const Input = styled.input.attrs({
    className: "form-control",
})`
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #eaeaed;
    border-radius: 4px;
    width: 100%;
`;

export const ButtonSubmit = styled.button.attrs({
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

export const ButtonExit = styled(OutlinedButton).attrs({})`
    background-color: #fff;
    border: 2px solid #9747ff;
    color: #4d5163;
    font-size: 24px;
    padding: 10px;
    margin-bottom: 15px;
    margin-top: 50px;
    width: 80%;
    font-weight: 600 !important;
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

export const FormGroup = styled.div.attrs({
    className: "col-sm-6",
})`
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* width: 50%; */
`;

export const InputTitle = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #363843;
`;

export const InputRow = styled.div.attrs({
    className: "row",
})`
    width: 100%;
`;

export const ButtonsRow = styled.div.attrs({})`
    display: flex;
    width: 100%;
    gap: 25px;
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: 10px;
    font-weight: bold;
`;

export const Popup = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #29b56b;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
`;

export const PopupMessage = styled.p`
    color: #fff;
    font-size: 16px;
    margin: 0;
`;
