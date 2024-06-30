import React, {useContext} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {Container, LeftSide, RightSide, Form, Input, Button, Link, Subtitle, FormContainer, FormGroup, InputTitle, LinkRow} from "./LoginPage.styles";
import {UserContext} from "../../hooks/UserContext";
import {login} from "../../api/ApiService";
import {useNavigate} from "react-router-dom";

interface IFormInput {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const {register, handleSubmit} = useForm<IFormInput>();
    const navigate = useNavigate();
    const context = useContext(UserContext);

    const {setUser} = context;

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data);
        login(data.username, data.password)
            .then(res => {
                setUser(res.data);
                navigate("/meus-dados");
            })
            .catch(err => {
                window.alert(err.message);
            });
    };

    return (
        <Container>
            <LeftSide />
            <RightSide>
                <FormContainer>
                    <Subtitle>Entre na sua conta</Subtitle>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <InputTitle>Username</InputTitle>
                            <Input {...register("username")} />
                        </FormGroup>
                        <FormGroup>
                            <InputTitle>Senha</InputTitle>
                            <Input {...register("password")} type="password" />
                        </FormGroup>
                        <Button type="submit">Entrar</Button>
                        <LinkRow>
                            Não possui conta?
                            <Link href="/cadastro"> Crie uma agora</Link>
                        </LinkRow>
                    </Form>
                </FormContainer>
            </RightSide>
        </Container>
    );
};

export default LoginPage;
