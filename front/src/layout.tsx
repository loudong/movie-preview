import { Layout, Menu } from 'antd';
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import './layout.less'

const { Header, Footer, Sider, Content } = Layout;
export default function Layouts () {
    const [current, setCurrent] = useState('')
    const location = useLocation()
    useEffect(()=>{
        const { pathname } = location
        setCurrent(pathname)
    }, [])
    return (
        <Layout className="layout">
            <Header className="layout-header">我来组成头部</Header>
            <Menu selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="/nav1">
                    <Link to={{pathname: '/nav1'}}>导航一</Link>
                </Menu.Item>
                <Menu.Item key="/nav2">
                    <Link to={{pathname: '/nav2'}}>导航二</Link>
                </Menu.Item>
                <Menu.Item key="/nav3">
                    <Link to={{pathname: '/nav3'}}>导航三</Link>
                </Menu.Item>
            </Menu>
            <Content className="layout-content">
                <Outlet />
            </Content>
            <Footer>Footer</Footer>
        </Layout>
    )
}