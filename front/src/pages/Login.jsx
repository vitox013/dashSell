import React from "react";
import { Card, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../img/dashSell_LOGO_transparent.png";
import { Link } from "react-router-dom";
import NavDash from "../components/NavDash";


const Login = () => {
    return (
        <>
            <NavDash info="" />
            <Container className="d-flex flex-column col-md-6 col-lg-5 col-xxl-3 mt-5">
                <Card className="shadow mt-5">
                    <Card.Body>
                        <Form className="fs-5">
                            <Form.Group className="mb-3" controlId="email">
                                <h3 className="mb-4 fw-bold">
                                    Entre em sua conta
                                </h3>
                                <Form.Text className="text-muted"></Form.Text>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    className="fs-5"
                                    type="email"
                                    placeholder="Insira o email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    className="fs-5"
                                    type="password"
                                    placeholder="Digite a senha"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCheckbox"
                            >
                                <Form.Check
                                    type="checkbox"
                                    label="Manter login"
                                />
                            </Form.Group>
                            <Link to="/dashboard">
                                <Button
                                    className="fs-5 w-100"
                                    variant="primary"
                                    type="submit"
                                >
                                    Entrar
                                </Button>
                            </Link>
                        </Form>
                        <p className="mt-3 text-center">
                            Novo aqui? <Link to="/signup">Crie uma conta</Link>
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default Login;
