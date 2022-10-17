import React from 'react';
import {Layout} from 'antd';
import Sidebar from '../Sidebar';
import {Routes, Route, Navigate} from 'react-router-dom';
import ClientsList from "../ClientsList";
import Dashboard from "../Dashboard";

const {Content, Header} = Layout;

const MainLayout = props => {
    return (
        <>
            <Layout className="main-layout-wr">
                <Sidebar/>
                <Layout className='layout' style={{background: "#EFF4FA"}}>
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                            background: "rgb(255, 255, 255)"
                        }}
                    >
                    </Header>

                    <Content className="site-layout-background">
                        <div style={{borderRadius: '10px'}}>
                            <Routes>
                                <Route path='/' element={<Navigate to='sign-in'/>}/>
                                <Route path='dashboard' element={<Dashboard/>}/>
                                <Route path='clients-list' element={<ClientsList/>}/>
                            </Routes>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default MainLayout;