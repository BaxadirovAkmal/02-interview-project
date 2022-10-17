import React, {useEffect, useState} from 'react';
import {Form, Select, Col, Row, Card, Tag, Input, Button, Modal, Space} from 'antd';
import CTable from "./Table";
import {PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import AddUserComponent from "./AddUserComponent";
import EditUserComponent from './EditUserComponent';
import CButton from "./Button";
import {useDispatch, useSelector} from "react-redux";
import {getRandomUsers} from "../store/slices/dashboardSlice";
import {changePageHandler, setToEditUserHandler, editModalVisibleHandler, editSelectedUserHandler, setToDeleteUserHandler, deleteSelectedUserHandler} from "../store/actions/dashboardActions";
import {nanoid} from '@reduxjs/toolkit';

const {Option} = Select;
const { confirm } = Modal;

const ClientsList = props => {

    const {users, loading, paginationData, modalVisible} = useSelector((state) => state.dashboard)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRandomUsers({
            page: paginationData.current,
            results: paginationData.limit
        }))
    }, [paginationData])

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addDrawerOpen, setAddDrawerOpen] = useState(false);
    const [editDrawerOpen, setEditDrawerOpen] = useState(false);
    const [viewDrawerOpen, setViewDrawerOpen] = useState(false);

    const addDrawerHandler = () => {
        setAddDrawerOpen(true);
    };

    const closeAddDrawerHandler = () => {
        setAddDrawerOpen(false);
    };

    const editDrawerHandler = () => {
        setEditDrawerOpen(true)
    }

    const closeEditDrawerHandler = () => {
        setEditDrawerOpen(false)
    }

    const viewDrawerHandler = () => {
        setViewDrawerOpen(true)
    }

    const closeDrawerHandler = () => {
        setViewDrawerOpen(false)
    }

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure to delete this user ?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                dispatch(deleteSelectedUserHandler());
            },
            onCancel() {
                return 'Cancel';
            },
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Plan',
            dataIndex: 'plan',
            key: 'plan',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, {status}) => (
                <>
                    {(status || []).map((tag) => {
                        let color = status.length > 6 ? 'geekblue' : 'green';
                        if (status === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {status}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (item) => <div style={{display: "flex"}}>
                <CButton onClick={() => dispatch(setToEditUserHandler(item))}><EditOutlined/></CButton>
                <CButton className="mx-10"><EyeOutlined/></CButton>
                <CButton onClick={() => {dispatch(setToDeleteUserHandler(item)); showDeleteConfirm()}}><DeleteOutlined/></CButton>
            </div>,
        },
    ];
    console.log('users', users)
    const companyGroupList = (users || []).map(item => (
        {
            key: nanoid(),
            id: item.id?.value,
            name: `${item.name?.first} ${item.name?.last}`,
            email: item.email,
            role: (item.role ? item.role : item.nat === 'US' ? 'Editor' : item.nat === 'TR' ? 'Author' : item.nat === 'GB' ? 'Maintainer' : 'Subscriber'),
            plan: (item.plan ? item.plan : item.nat === 'IE' ? 'Enterprise' : item.nat === 'ES' ? 'Team' : 'Maintainer'),
            status: [(item.status? item.status : item.nat === 'FI' ? 'Active' : item.nat === 'UA' ? 'Pending' : 'Inactive')]
        }
    ))

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;
    console.log('companyGroupList+++', companyGroupList)
    return (
        <>
            <Form className='search-form-box'>
                <div className='search-form-box-title'>Search Filters</div>
                <Row>
                    <Col span={8} style={{paddingRight: "10px"}}>
                        <Form.Item
                            name="role"
                        >
                            <Select
                                placeholder="Select Role"
                                allowClear
                            >
                                <Option value="editor">Editor</Option>
                                <Option value="author">Author</Option>
                                <Option value="maintainer">Maintainer</Option>
                                <Option value="subscriber">Subscriber</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} style={{padding: "0 10px"}}>
                        <Form.Item
                            name="plan"
                        >
                            <Select
                                placeholder="Select Plan"
                                allowClear
                            >
                                <Option value="enterprise">Enterprise</Option>
                                <Option value="team">Team</Option>
                                <Option value="company">Company</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} style={{paddingLeft: "10px"}}>
                        <Form.Item
                            name="status"
                        >
                            <Select
                                placeholder="Select Status"
                                allowClear
                            >
                                <Option value="inactive">Inactive</Option>
                                <Option value="pending">Pending</Option>
                                <Option value="active">Active</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Card style={{borderRadius: '10px', marginTop: '30px'}}>
                <div style={{textAlign: 'right', marginBottom: '20px', height: '38px'}}>
                    <Input
                        placeholder="search"
                        allowClear
                        style={{
                            width: 200,
                            height: '38px',
                            fontSize: '17px',
                            borderRadius: '10px'
                        }}
                    />
                    <Button type="primary" onClick={addDrawerHandler} icon={<PlusOutlined/>}
                            style={{borderRadius: '10px', fontSize: '17px', height: 'inherit', marginLeft: '25px'}}>
                        Add User
                    </Button>
                </div>
                <AddUserComponent closeAddDrawerHandler={closeAddDrawerHandler} addDrawerOpen={addDrawerOpen}/>
                <EditUserComponent editModalVisibleHandler={() => dispatch(editModalVisibleHandler())} modalVisible={modalVisible}/>
                <CTable
                    dataSource={companyGroupList}
                    columns={columns}
                    rowSelection={rowSelection}
                    paginationProps={{
                        ...users.paginationData,
                        onChange: ({page, pageSize, start}) => dispatch(changePageHandler({
                            current: page,
                            start: start,
                            limit: pageSize,
                            pageSize: pageSize
                        })),
                        total: 100,
                        pagination: true
                    }}
                />
            </Card>
        </>
    );
}

export default ClientsList;