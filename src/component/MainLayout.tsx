import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import HeaderApp from "./HeaderApp";
import {Link}  from 'react-router-dom';
const {  Content, Footer, Sider } = Layout;

const MainLayout: React.FC = ({children})=> {

    return (
        <Layout style={{minHeight:'100vh'}}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" >Quiz Lab</div>
                <Menu  mode="inline" defaultSelectedKeys={['1']} style={{paddingTop:'24px'}}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to={'/'}>Новости</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        <Link to={'/profile'}>Профиль</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        <Link to={'/followers'}>Подписчики</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <HeaderApp/>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: '100%', }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2021 Created by Stepanov Dmitry</Footer>
            </Layout>
        </Layout>
    );
}

export default MainLayout;