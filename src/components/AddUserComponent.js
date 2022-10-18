import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React from 'react';
import {useDispatch} from "react-redux";
import {addNewUserHandler} from "../store/actions/dashboardActions";
import {nanoid} from "@reduxjs/toolkit";

const { Option } = Select;

const AddUserComponent = props => {
    const {closeAddDrawerHandler, addDrawerOpen} = props
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const transfer = {
            name: {
                first: values.first,
                last: values.last
            },
            email: values.email,
            gender: values.gender,
            nat: values.nation,
            location: {city: values.location},
            id: {value: nanoid()},
        }
        dispatch(addNewUserHandler(transfer))
        form.resetFields();
        console.log('Success:', transfer);
    };
    
    return (
        <div className="drawer-wr">
            <Drawer
                title="Create a new account"
                width={500}
                onClose={closeAddDrawerHandler}
                open={addDrawerOpen}
                bodyStyle={{
                    paddingBottom: 80,
                }}
            >
                <Form layout="vertical" hideRequiredMark onFinish={onFinish} form={form}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="first"
                                label="First name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter first name',
                                    },
                                ]}
                            >
                                <Input placeholder="John" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="last"
                                label="Last name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter last name',
                                    },
                                ]}
                            >
                                <Input placeholder="Dou" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter email',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="johndou@example.com"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a gender',
                                    },
                                ]}
                            >
                                <Select placeholder="Please select a gender">
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="nation"
                                label="Nation"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose the nation',
                                    },
                                ]}
                            >
                                <Select placeholder="Please choose the nation">
                                    <Option value="IE">IE</Option>
                                    <Option value="DE">DE</Option>
                                    <Option value="AU">AU</Option>
                                    <Option value="UK">UK</Option>
                                    <Option value="US">US</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="location"
                                label="Location"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose the location',
                                    },
                                ]}
                            >
                                <Select placeholder="Please choose the location">
                                    <Option value="Blessington">Blessington</Option>
                                    <Option value="Hobart">Hobart</Option>
                                    <Option value="Isparta">Isparta</Option>
                                    <Option value="Pueblo">Pueblo</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button onClick={closeAddDrawerHandler}>Cancel</Button>
                        <Button onClick={closeAddDrawerHandler} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form>
            </Drawer>
        </div>
    );
}

export default AddUserComponent;