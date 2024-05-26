import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {
    Container,
    LeftSide,
    RightSide,
    Form,
    Input,
    Button,
    Link,
    Subtitle,
    FormContainer,
    FormGroup,
    InputTitle,
    LinkRow,
} from "./LoginPage.styles";

interface IFormInput {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const {register, handleSubmit} = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data); //É aqui que vamos chamar a API
    };

    return (
        <Container>
            <LeftSide />
            <RightSide>
                <FormContainer>
                    <Subtitle>Entre na sua conta</Subtitle>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <InputTitle>Email</InputTitle>
                            <Input {...register("email")} />
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
