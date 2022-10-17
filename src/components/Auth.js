import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Form, Input, Col,Card} from 'antd';

const Auth = props => {
    const navigate = useNavigate();
    return (
        <div style={{
            height: "100vh",
            background: "rgb(239, 244, 250)",
            display: "flex",
            justifyContent: "center",
            paddingTop: "15vh",
        }}
             className="login-page"
        >
            <Col span={7}>
                <Card className='login-form-card' style={{borderRadius: "15px"}}>
                    <h2
                        style={{textAlign: "center", color: "#666666"}}
                        className="my-15"
                    >
                        Sign in
                    </h2>
                    <Form
                        name="loginForm"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        initialValues={{
                            username: "",
                            password: "",
                            remember: true,
                        }}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"
                            style={{maxWidth: "100%"}}
                        >
                            <Input placeholder="Username"
                                   style={{maxWidth: "100%", padding: "10px", fontSize: "16px", borderRadius: "15px"}}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            style={{maxWidth: "100%"}}
                        >
                            <Input.Password placeholder="Password"
                                            style={{maxWidth: "100%", padding: "10px", fontSize: "16px", borderRadius: "15px"}}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                    style={{
                                    width: "100%",
                                    borderRadius: "15px",
                                    height: "40px",
                                    fontSize: "17px"
                                }}
                            onClick={() => navigate("/dashboard")}
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </div>
    );
}

export default Auth;