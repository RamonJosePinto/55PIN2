import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    LeftSide,
    RightSide,
    Title,
    Subtitle,
    Form,
    Input,
    ButtonSubmit,
    ButtonExit,
    Link,
    FormContainer,
    FormGroup,
    InputTitle,
    InputRow,
    ButtonsRow,
} from "./RegisterPage.styles";
import {useNavigate} from "react-router-dom";

interface IFormInput {
    fullName: string;
    username: string;
    email: string;
    password: string;
    country: string;
    userType: string;
}

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data);
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
                            </FormGroup>
                            <FormGroup>
                                <InputTitle>Nome de usuário</InputTitle>
                                <Input {...register("username")} />
                            </FormGroup>
                        </InputRow>
                        <InputRow>
                            <FormGroup>
                                <InputTitle>E-mail</InputTitle>
                                <Input {...register("email")} type="email" />
                            </FormGroup>
                            <FormGroup>
                                <InputTitle>Senha</InputTitle>
                                <Input
                                    {...register("password")}
                                    type="password"
                                />
                            </FormGroup>
                        </InputRow>
                        <InputRow>
                            <FormGroup>
                                <InputTitle>País de origem</InputTitle>
                                <Input {...register("country")} />
                            </FormGroup>
                            <FormGroup>
                                <InputTitle>Tipo de usuário</InputTitle>
                                <Input
                                    as="select"
                                    {...register("userType")}
                                    className="form-select"
                                >
                                    <option value="Reviewer">Reviewer</option>
                                    <option value="Business Owner">
                                        Business Owner
                                    </option>
                                </Input>
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
            </RightSide>
        </Container>
    );
};

export default RegisterPage;
