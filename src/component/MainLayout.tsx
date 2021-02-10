import React, {useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import {TeamOutlined, UserOutlined, HomeOutlined} from '@ant-design/icons';
import HeaderApp from "./HeaderApp";
import {Link, useLocation} from 'react-router-dom';

const {Content, Footer, Sider} = Layout;

const MainLayout: React.FC = ({children}) => {
    let location = useLocation();
    useEffect(() => {
        setSelectedKey([`${location.pathname}`])
    }, [location])
    const initSelectedKey = [location.pathname]
    const [selectedKey, setSelectedKey] = useState(initSelectedKey)
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className="logo">Quiz Lab</div>
                <Menu mode="inline" selectedKeys={selectedKey} style={{paddingTop: '24px'}}>
                    <Menu.Item key="/" icon={<HomeOutlined/>}>
                        <Link to={'/'}>Новости</Link>
                    </Menu.Item>
                    <Menu.Item key="/profile" icon={<UserOutlined/>}>
                        <Link to={'/profile'}>Профиль</Link>
                    </Menu.Item>
                    <Menu.Item key="/followers" icon={<TeamOutlined />}>
                        <Link to={'/followers'}>Подписчики</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <HeaderApp/>
                <Content style={{margin: '24px 16px 0'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: '100%',}}>
                        {children}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>©2021 Created by Stepanov Dmitry</Footer>
            </Layout>
        </Layout>
    );
}

export default MainLayout;