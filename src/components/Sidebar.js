import React, { useState } from 'react';
import {menus} from '../menu/menu';
import {useNavigate} from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Sider} = Layout;

const Sidebar = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const menuData = [...menus];

    const getMenu = (menu) => {
        return menu.map((item) => {
            const menuItem = (
                <div onClick={() => navigate(item.path)}>
                    <i>{item.icon}</i>
                    <span className='ml-10' style={{fontSize: "17px", marginLeft: "15px"}}>{item.name}</span>
                </div>
            );

            return <Menu.Item key={item.id}>{menuItem}</Menu.Item>;
        });
    };

    return (
        <div className='sidebar'>
            <Sider className='left-side-menu' trigger={null} collapsible collapsed={collapsed}
                   style={{boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.15)", height: "100%", background: "#ffffff"}}>
                <div className="logo" />
                <Menu theme="light" mode="inline">
                    {getMenu(menuData)}
                </Menu>
            </Sider>
        </div>
    );
};

export default Sidebar;