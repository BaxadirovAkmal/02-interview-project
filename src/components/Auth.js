import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Form, Input, Col,Card, Alert} from 'antd';
import {useDispatch, useSelector} from "react-redux";

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {error, success} = useSelector((state) => state.auth);
    const [form] = Form.useForm();

    useEffect(() => {
        if (success) {
            navigate('/dashboard', {replace: true});
            window.addEventListener('popstate', function () {
                navigate('/dashboard', {replace: true});
            });
        }
        form.resetFields();
    }, [success])

    useEffect(() => {
        if (error)
            console.log(error);
    }, [error])

    const onFinish = (values) => {
        // dispatch(authInit(values))
        navigate('/dashboard')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


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
                            email: "",
                            password: "",
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            name="email"
                            style={{maxWidth: "100%"}}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email !',
                                },
                            ]}
                        >
                            <Input placeholder="Email"
                                   style={{maxWidth: "100%", padding: "10px", fontSize: "16px", borderRadius: "15px"}}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            style={{maxWidth: "100%"}}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password !',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password"
                                            style={{maxWidth: "100%", padding: "10px", fontSize: "16px", borderRadius: "15px"}}/>
                        </Form.Item>
                        {error && <div>
                            <Alert message={error.message} type="error" />
                        </div>}
                        <Form.Item>
                            <Button type="primary" htmlType="submit"
                                    style={{
                                    width: "100%",
                                    borderRadius: "15px",
                                    height: "40px",
                                    fontSize: "17px"
                                }}
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