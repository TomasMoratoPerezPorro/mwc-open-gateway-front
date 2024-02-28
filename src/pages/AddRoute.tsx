import { useState, useEffect } from 'react'
import { Button, Modal, Form, DatePicker, Select } from 'antd'
import { fetchUsersByRoleFestival } from '../services/users'

type FieldType = {
  username?: string
  startDate?: Date
  vehicle?: string
  endDate?: Date
}

const AddRouteModal = () => {
  const [shownModal, showModal] = useState(false);
  const [usersSelect, setusersSelect] = useState<[]>([]);
  const selectedUser = useState()
  const vehiclesSelect = useState([])
  const selectedVehicle = useState()

  const getUsers = async () => {
    try {
      const {users} = await fetchUsersByRoleFestival();
      setusersSelect(users)
    } catch (error) {
      if (error) return alert(error)
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onFinish = async (values: FieldType) => {
    console.log('Success:', values)
    return
    // if (!values.username || !values.password)
    //   return alert('Please fill all the fields')

    // try {
    //   const {
    //     data: { user, session },
    //     error
    //   } = await login(values.username, values.password);
    //   if (user && session) navigate("/");
    // } catch (error) {
    //   if (error) return alert(error)
    // }
    // login(values.username, values.password)
  }

  const onFinishFailed = (errorInfo: any) => {
    alert(`Failed ${errorInfo}`)
  }


  return (
    <>
      <Button type="primary" onClick={() => showModal(true)}>
        Vertically centered modal dialog
      </Button>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={shownModal}
        onCancel={() => showModal(false)}
        footer={null}
      >
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
          <Form.Item name="user_id" label="VIP User" rules={[{ required: true }]}>
            <Select
            showSearch={true}
              placeholder="Select a user"
              allowClear
            >
              {usersSelect.map(user => (
                <Select.Option value={user.user_id} key={user.user_id}>
                  {user.username}                        
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>

          {/* <Form.Item name="vehicle" label="vehicle" rules={[{ required: true }]}>
            <Select
              placeholder="Select a vehicle"
              allowClear
            >
              <Option value=""></Option>
            </Select>
          </Form.Item> */}

          <Form.Item<FieldType>
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddRouteModal