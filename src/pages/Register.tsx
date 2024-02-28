import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import { supabase } from '../services/supabaseClient'

type FieldType = {
  username?: string
  password?: string
  confirmPsw?: string
  remember?: string
}

const Register = () => {
  const [loading, setLoading] = useState(false)

  const register = async (email: string, password: string) =>
    supabase.auth.signUp({ email, password })

  const onFinish = async (values: FieldType) => {
    console.log('Success:', values)
    if (!values.username || !values.password)
      return alert('Please fill all the fields')
    if (values.password !== values.confirmPsw)
      return alert("Passwords doesn't match")
    try {
      const { data, error } = await register(values.username, values.password)
    } catch (error) {
      if (error) return alert(error)
    }
    register(values.username, values.password)
  }

  const onFinishFailed = (errorInfo: any) => {
    alert(`Failed ${errorInfo}`)
  }

  return (
    <>
      <Card title="Register" bordered={false} style={{ width: 300 }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Confirm password"
            name="confirmPsw"
            rules={[{ required: true, message: 'Please input your password!' }]}
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
      <div className="w-100 text-center mt-2">
        Already a User? <Link to={'/login'}>Login</Link>
      </div>
    </>
  )
}

export default Register
