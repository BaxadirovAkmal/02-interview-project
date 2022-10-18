import React, {useEffect} from 'react';
import { Col, Drawer, Form, Input, Row, Select,} from 'antd';
import {useSelector} from "react-redux";

const { Option } = Select;

const ViewUserComponent = props => {
    const {viewModalVisibleHandler, viewModalVisible} = props
    const {item} = useSelector((state) => state.dashboard)
    const [form] = Form.useForm();

    useEffect(() => {
        const _item = {
            first: item.name?.split(' ')[0],
            last: item.name?.split(' ')[1],
            email: item.email,
            gender: item.gender,
            location: item.location,
            nation: item.nation,
            key: item.key
        }
        if (_item.key) {
            form.setFieldsValue(_item)
        }
    }, [item])

    return (
        <div className='drawer-wr'>
            <Drawer
                title="View selected an account"
                width={500}
                onClose={viewModalVisibleHandler}
                open={viewModalVisible}
                bodyStyle={{
                    paddingBottom: 80,
                }}

            >
                <Form layout="vertical" hideRequiredMark form={form} style={{pointerEvents: 'none'}}>
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
                </Form>
            </Drawer>
        </div>
    );
}

export default ViewUserComponent;