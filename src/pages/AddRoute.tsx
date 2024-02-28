import { useState, useEffect } from 'react'
import { Button, Modal, Form, DatePicker, Select } from 'antd'
import { fetchUsersByRoleFestival } from '../services/users'
import { fetchVehiclesByFestival } from '../services/vehicles'
import { addRoute } from '../services/route'

type FieldType = {
  user_id?: string
  startDate?: Date
  vehicle_id?: string
  endDate?: Date
}

const AddRouteModal = () => {
  const [shownModal, showModal] = useState(false);
  const [usersSelect, setusersSelect] = useState<[]>([]);
  const [vehiclesSelect, setVehiclesSelect] = useState<[]>([]);

  const getUsers = async () => {
    try {
      const {users} = await fetchUsersByRoleFestival();
      setusersSelect(users)
    } catch (error) {
      if (error) return alert(error)
    }
  };

  const getVehicles = async () => {
    try {
      const {vehicles} = await fetchVehiclesByFestival();
      setVehiclesSelect(vehicles)
    } catch (error) {
      if (error) return alert(error)
    }
  };


  useEffect(() => {
    getUsers();
    getVehicles();
  }, []);

  const onFinish = async (values: FieldType) => {
    console.log('Success:', values)
    if (!values.user_id || !values.startDate || !values.endDate || !values.vehicle_id)
      return alert('Please fill all the fields')

    try {
      const {
        data,
        error
      } = await addRoute(values);
    } catch (error) {
      if (error) return alert(error)
    }
  }

  return (
    <>
      <Button type="primary" onClick={() => showModal(true)}>
        Create new Route
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
          autoComplete="off"
        >
          <Form.Item name="user_id" label="VIP User" rules={[{ required: true }]}>
            <Select
            showSearch={true}
              placeholder="Select a user"
              allowClear
            >
              {usersSelect.map(user => (
                <Select.Option value={user.user_id} key={user.user_id} title={user.username} id={user.user_id}>
                  {user.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>

          <Form.Item name="vehicle_id" label="Vehicle" rules={[{ required: true }]}>
            <Select
            showSearch={true}
              placeholder="Select a vehicle"
              allowClear
            >
              {vehiclesSelect.map(vehicle => (
                <Select.Option value={vehicle.vehicle_id} key={vehicle.vehicle_id}>
                  {vehicle.name} - {vehicle.brand}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please select a date!' }]}
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