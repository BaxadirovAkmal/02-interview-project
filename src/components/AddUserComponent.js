import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
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
            role: values.role,
            plan: values.plan,
            status: values.status,
            id: {value: nanoid()},
            nat: "UZ"
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
                                name="role"
                                label="Role"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a role',
                                    },
                                ]}
                            >
                                <Select placeholder="Please select a role">
                                    <Option value="Editor">Editor</Option>
                                    <Option value="Author">Author</Option>
                                    <Option value="Maintainer">Maintainer</Option>
                                    <Option value="Subscriber">Subscriber</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="plan"
                                label="Plan"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose the plan',
                                    },
                                ]}
                            >
                                <Select placeholder="Please choose the plan">
                                    <Option value="Enterprise">Enterprise</Option>
                                    <Option value="Team">Team</Option>
                                    <Option value="Company">Company</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose the status',
                                    },
                                ]}
                            >
                                <Select placeholder="Please choose the status">
                                    <Option value="Inactive">Inactive</Option>
                                    <Option value="Pending">Pending</Option>
                                    <Option value="Active">Active</Option>
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