import React from 'react'
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd'
import { useAuth } from '../hooks/auth-context'
import { Outlet, useNavigate } from 'react-router-dom'

const { Header, Content, Footer } = Layout

const items = new Array(2).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}))

const myItems = [
  { key: '1', label: 'Routes', path: '/' },
  { key: '2', label: 'Drivers', path: '/drivers' },
]

const layoutStyle = {
  height: '100%',
}

const LayoutWrapper = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const handleMenuClick = (e: any) => {
    const item = myItems.find((item) => item.key === e.key)
    if (item && item.path) {
      navigate(item.path) // Use navigate with the item's path
    }
  }

  return (
    <Layout style={layoutStyle}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={myItems.map((item) => ({ ...item, onClick: handleMenuClick }))}
          style={{ flex: 1, minWidth: 0 }}
        />
        {user && <Button onClick={signOut}>LogOut</Button>}
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet /> 
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Even master conection logistic{new Date().getFullYear()} Created by MWC
        Talent Arena
      </Footer>
    </Layout>
  )
}

export default LayoutWrapper
