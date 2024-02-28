import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Flex } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../hooks/auth-context'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  const register = async (email: string, password: string) =>
    supabase.auth.signUp({ email, password })

  const onFinish = async (values: FieldType) => {
    console.log('Success:', values)
    if (!values.username || !values.password)
      return alert('Please fill all the fields')

    try {
      const {
        data: { user, session },
        error,
      } = await login(values.username, values.password)
      if (user && session) navigate('/')
    } catch (error) {
      if (error) return alert(error)
    }
    login(values.username, values.password)
  }

  const onFinishFailed = (errorInfo: any) => {
    alert(`Failed ${errorInfo}`)
  }

  return (
    <Flex gap="middle" align="center" vertical>
      <Flex justify={'center'} align={'center'}>
        <Card title="Login" bordered={false} style={{ width: 500 }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 1000 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
      <div className="w-100 text-center mt-2">
        New User? <Link to={'/register'}>Register</Link>
      </div>
      oriolcuellar1357@gmail.com
    </Flex>
  )
}

export default Login
