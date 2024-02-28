import React from 'react'
import { useAuth } from '../hooks/auth-context'
import { useQuery } from '../hooks/use-query'
import { Route } from '../types/dtos'
import { Fetch } from '../components/fetch'
import { Table, TableProps } from 'antd'

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

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'RouteId',
    dataIndex: 'route_id',
    key: 'route_id',
    render: (text) => <a>{text}</a>,
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
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green'
  //         if (tag === 'loser') {
  //           color = 'volcano'
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         )
  //       })}
  //     </>
  //   ),
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
]

const Home = () => {
  const { user } = useAuth()

  const { data, isLoading, error } = useQuery({
    url: 'http://localhost:3000/routes',
    transform: transformConfig,
  })

  if (error ) {
    return <p>Ha habido un error</p>
  }

  if (isLoading ) {
    return <p>Cargando</p>
  }

  if (data) {
    return <Table columns={columns} dataSource={data} />
  }
}

export default Home

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
