import React, { useState } from 'react'
import { useAuth } from '../hooks/auth-context'
import { useQuery } from '../hooks/use-query'
import { Route } from '../types/dtos'
// import { Fetch } from '../components/fetch'
import { Modal, Table, TableProps } from 'antd'

export const transformConfig = ({ data }: { data: Route[] }): DataType[] =>
  data.map((item) => ({
    route_id: item.route_id,
    start_coordinates_latitude: item.start_coordinates_latitude,
    start_coordinates_longitude: item.start_coordinates_longitude,
    // Uncomment and add other properties as needed
    // end_coordinates_latitude: item.end_coordinates_latitude,
    // end_coordinates_longitude: item.end_coordinates_longitude,
    // pickup_time: item.pickup_time,
    // drop_time: item.drop_time,
  }))

interface DataType {
  route_id: string
  start_coordinates_latitude: number
  start_coordinates_longitude: number
  // end_coordinates_latitude: number
  // end_coordinates_longitude: number
  // pickup_time: string
  // drop_time: string
}



type RouteTableProps = {
  data: DataType[]
}

const RoutesTable = (props: RouteTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<DataType | null>(null)

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'RouteId',
      dataIndex: 'route_id',
      key: 'route_id',
      render: (text, record) => <a onClick={() => showModal(record)}>{text}</a>,
    },
    {
      title: 'Start Longitude',
      dataIndex: 'start_coordinates_latitude',
      key: 'start_coordinates_latitude',
    },
    {
      title: 'Start Latitude',
      dataIndex: 'start_coordinates_longitude',
      key: 'start_coordinates_longitude',
    },
  ]

  const showModal = (route: DataType) => {
    console.log('Route clicked:', route)
    setSelectedRoute(route)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }


  return (
    <>
      <Table columns={columns} dataSource={props.data} />
      <Modal
        title="Route details"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedRoute && (
          <>
            <p>Route ID: {selectedRoute.route_id}</p>
            <p>Start Latitude: {selectedRoute.start_coordinates_latitude}</p>
            <p>Start Longitude: {selectedRoute.start_coordinates_longitude}</p>
            {/* Uncomment and add other properties as needed */}
            {/* <p>End Latitude: {selectedRoute.end_coordinates_latitude}</p> */}
            {/* <p>End Longitude: {selectedRoute.end_coordinates_longitude}</p> */}
            {/* <p>Pickup Time: {selectedRoute.pickup_time}</p> */}
            {/* <p>Drop Time: {selectedRoute.drop_time}</p> */}
          </>
        )}
      </Modal>
    </>
  )
}

export default RoutesTable

/* 
<Fetch
      {...query}
      loadingComponent={<strong>Cargando...</strong>}
      errorComponent={<p>Ha habido un error</p>}
    >
      {(data: DataType[]) => {
        console.log('data inside', data)
        if (data.length === 0) return <p>No hay usuarios</p>

        return <Table columns={columns} dataSource={query.data ?? []} />
      }}
    </Fetch>
*/
