import React, {useEffect, useState} from 'react';
import {Form, Select, Col, Row, Card, Input, Button, Modal, Spin} from 'antd';
import CTable from "./Table";
import {PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import AddUserComponent from "./AddUserComponent";
import EditUserComponent from './EditUserComponent';
import ViewUserComponent from "./ViewUserComponent";
import CButton from "./Button";
import {useDispatch, useSelector} from "react-redux";
import {getRandomUsers} from "../store/slices/dashboardSlice";
import {
    changePageHandler,
    setToEditUserHandler,
    editModalVisibleHandler,
    setToDeleteUserHandler,
    deleteSelectedUserHandler,
    selectByGenderHandler,
    selectByNationHandler,
    selectByLocationHandler,
    viewSelectedUserHandler,
    viewModalVisibleHandler
} from "../store/actions/dashboardActions";
import {nanoid} from '@reduxjs/toolkit';

const {Option} = Select;
const {confirm} = Modal;

const ClientsList = () => {

    const {users, loading, paginationData, modalVisible, viewModalVisible} = useSelector((state) => state.dashboard)
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getRandomUsers({
            page: paginationData.current,
            results: paginationData.limit
        }))
    }, [paginationData])

    const [addDrawerOpen, setAddDrawerOpen] = useState(false);
    const [searchedText, setSearchedText] = useState("");

    const addDrawerHandler = () => {
        setAddDrawerOpen(true);
    };

    const closeAddDrawerHandler = () => {
        setAddDrawerOpen(false);
    };

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure to delete this user ?',
            icon: <ExclamationCircleOutlined/>,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                dispatch(deleteSelectedUserHandler());
            },
            onCancel: () => false,
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return String(record.name).toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            sorter: (a, b) => a.gender.length - b.gender.length,
        },
        {
            title: 'Nation',
            dataIndex: 'nation',
            key: 'nation',
        },
        {
            title: 'Location',
            key: 'location',
            dataIndex: 'location',
            sorter: (a, b) => a.location.length - b.location.length,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (item) => <div style={{display: "flex"}}>
                <CButton onClick={() => dispatch(setToEditUserHandler(item))}><EditOutlined/></CButton>
                <CButton className="mx-10" onClick={() => dispatch(viewSelectedUserHandler(item))}><EyeOutlined/></CButton>
                <CButton onClick={() => {
                    dispatch(setToDeleteUserHandler(item));
                    showDeleteConfirm()
                }}><DeleteOutlined/></CButton>
            </div>,
        },
    ];

    const companyGroupList = (users || []).map(item => (
        {
            key: nanoid(),
            id: item.id?.value,
            name: `${item.name?.first} ${item.name?.last}`,
            email: item.email,
            gender: item.gender,
            nation: item.nat,
            location: item.location?.city
        }
    ))

    const onReset = () => {
        form.resetFields();
        dispatch(getRandomUsers({
            page: paginationData.current,
            results: paginationData.limit
        }))
    };

    return (
        <>
            {loading && <div className="auth-loader">
                <Spin size="large"/>
            </div>}
            <Form className='search-form-box' form={form}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div className='search-form-box-title'>Search Filters</div>
                    <div className='search-form-box-title'>
                        <Button style={{fontSize: "16px", padding: "4px 20px"}} onClick={() => onReset()}>Reset</Button>
                    </div>
                </div>
                <Row>
                    <Col span={8} style={{paddingRight: "10px"}}>
                        <Form.Item
                            name="gender"
                        >
                            <Select
                                placeholder="Select Gender"
                                allowClear
                                onChange={(value) => dispatch(selectByGenderHandler(value))}
                            >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} style={{padding: "0 10px"}}>
                        <Form.Item
                            name="nation"
                        >
                            <Select
                                placeholder="Select Nation"
                                allowClear
                                onChange={(value) => dispatch(selectByNationHandler(value))}
                            >
                                <Option value="IE">IE</Option>
                                <Option value="DE">DE</Option>
                                <Option value="AU">AU</Option>
                                <Option value="UK">UK</Option>
                                <Option value="US">US</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} style={{paddingLeft: "10px"}}>
                        <Form.Item
                            name="location"
                        >
                            <Select
                                placeholder="Select Location"
                                allowClear
                                onChange={(value) => dispatch(selectByLocationHandler(value))}
                            >
                                <Option value="Blessington">Blessington</Option>
                                <Option value="Hobart">Hobart</Option>
                                <Option value="Isparta">Isparta</Option>
                                <Option value="Isparta">Pueblo</Option>
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
                        onChange={(e) => {
                            setSearchedText(e.target.value)
                        }}
                    />
                    <Button type="primary" onClick={addDrawerHandler} icon={<PlusOutlined/>}
                            style={{borderRadius: '10px', fontSize: '17px', height: 'inherit', marginLeft: '25px'}}>
                        Add User
                    </Button>
                </div>
                <AddUserComponent closeAddDrawerHandler={closeAddDrawerHandler} addDrawerOpen={addDrawerOpen}/>
                <EditUserComponent editModalVisibleHandler={() => dispatch(editModalVisibleHandler())}
                                   modalVisible={modalVisible}/>
                <ViewUserComponent viewModalVisibleHandler={() => dispatch(viewModalVisibleHandler())}
                                   viewModalVisible={viewModalVisible}/>
                <CTable
                    dataSource={companyGroupList}
                    columns={columns}
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