import React, {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    LeftSide,
    RightSide,
    Subtitle,
    Form,
    Input,
    ButtonSubmit,
    ButtonExit,
    FormContainer,
    FormGroup,
    InputTitle,
    InputRow,
    ButtonsRow,
    ErrorMessage,
    Popup, // Import the styled popup component
    PopupMessage, // Import the styled popup message component
} from "./RegisterPage.styles";
import {useNavigate} from "react-router-dom";
import {postUser} from "../../api/ApiService";
import * as yup from "yup";

interface IFormInput {
    fullName: string;
    username: string;
    email: string;
    password: string;
    country: string;
    userType: string;
    biography: string;
}

const schema = yup.object().shape({
    fullName: yup.string().required("Nome completo é obrigatório"),
    username: yup.string().required("Nome de usuário é obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
    country: yup.string().required("País de origem é obrigatório"),
    userType: yup.string().required("Tipo de usuário é obrigatório"),
    biography: yup.string().required("Biografia é obrigatória"),
});

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    });
    const [showPopup, setShowPopup] = useState(false);

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        console.log(data);
        await postUser(data)
            .then(() => {
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    navigate("/meus-dados");
                }, 3000);
            })
            .catch(res => {
                console.log(res?.message);
            });
    };

    return (
        <Container>
            <LeftSide />
            <RightSide>
                <FormContainer>
                    <Subtitle>Cadastre-se gratuitamente</Subtitle>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <InputRow>
                            <FormGroup>
                                <InputTitle>Nome completo</InputTitle>
                                <Input {...register("fullName")} />
                                {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
                            </FormGroup>
                            <FormGroup>
                                <InputTitle>Nome de usuário</InputTitle>
                                <Input {...register("username")} />
                                {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                            </FormGroup>
                        </InputRow>
                        <InputRow>
                            <FormGroup>
                                <InputTitle>E-mail</InputTitle>
                                <Input {...register("email")} type="email" />
                                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                            </FormGroup>
                            <FormGroup>
                                <InputTitle>Senha</InputTitle>
                                <Input {...register("password")} type="password" />
                                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                            </FormGroup>
                        </InputRow>
                        <InputRow>
                            <FormGroup>
                                <InputTitle>País de origem</InputTitle>
                                <Input {...register("country")} />
                                {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}
                            </FormGroup>
                            <FormGroup>
                                <InputTitle>Tipo de usuário</InputTitle>
                                <Input as="select" {...register("userType")} className="form-select">
                                    <option value="ARTISTA">ARTISTA</option>
                                    <option value="REVIEWER">Business Owner</option>
                                </Input>
                                {errors.userType && <ErrorMessage>{errors.userType.message}</ErrorMessage>}
                            </FormGroup>
                        </InputRow>
                        <InputRow>
                            <FormGroup>
                                <InputTitle>Biografia</InputTitle>
                                <Input {...register("biography")} type="text" />
                                {errors.biography && <ErrorMessage>{errors.biography.message}</ErrorMessage>}
                            </FormGroup>
                        </InputRow>
                        <ButtonsRow>
                            <ButtonSubmit type="submit">Entrar</ButtonSubmit>
                            <ButtonExit
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Sair
                            </ButtonExit>
                        </ButtonsRow>
                    </Form>
                </FormContainer>
                {showPopup && (
                    <Popup>
                        <PopupMessage>Cadastro realizado com sucesso!</PopupMessage>
                    </Popup>
                )}
            </RightSide>
        </Container>
    );
};

export default RegisterPage;
