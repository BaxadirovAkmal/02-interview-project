import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getRandomUsers} from '../store/slices/dashboardSlice';
import {Card, Row, Col} from 'antd';
import {nanoid} from '@reduxjs/toolkit';

const { Meta } = Card;

const Dashboard = props => {
    const {users, loading} = useSelector((state) => state.dashboard)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRandomUsers({results: 100}))
    }, [])

    return (
        <Row gutter={16}>
            {(users || []).map((item, index) => (
                <Col span={4} style={{marginBottom: 20}} key={nanoid()}>
                    <Card title={item.title} bordered={true} style={{borderRadius: 15, width: 240}}
                          cover={<img alt="example" src={item.picture.large} className="card-img"/>}>
                        <Meta title={`${item.name.first} ${item.name.last}`} description={item.email} />
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default Dashboard;