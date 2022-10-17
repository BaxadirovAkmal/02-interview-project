import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editSelectedUserHandler} from "../store/actions/dashboardActions";

const { Option } = Select;

const EditUserComponent = (props) => {
    const {editModalVisibleHandler, modalVisible} = props
    const dispatch = useDispatch();
    const {users, item} = useSelector((state) => state.dashboard)
    const [form] = Form.useForm();

    const _item = {
        first: item.name?.split(' ')[0],
        last: item.name?.split(' ')[1],
        email: item.email,
        role: item.role,
        plan: item.plan,
        status: item.status
    }

    const onFinish = (values) => {
        const transfer = {
            name: {
                first: values.first,
                last: values.last
            },
            ...values
        }
        dispatch(editSelectedUserHandler(transfer))
        form.resetFields();
        console.log('Success:', transfer);
    };
    console.log('item:', item);

    return (
        <div className='drawer-wr'>
            <Drawer
                title="Edit selected an account"
                width={500}
                onClose={editModalVisibleHandler}
                open={modalVisible}
                bodyStyle={{
                    paddingBottom: 80,
                }}
            >
                <Form layout="vertical" hideRequiredMark onFinish={onFinish} form={form} initialValues={_item}>
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
                        <Button onClick={editModalVisibleHandler}>Cancel</Button>
                        <Button onClick={editModalVisibleHandler} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form>
            </Drawer>
        </div>
    );
}

export default EditUserComponent;