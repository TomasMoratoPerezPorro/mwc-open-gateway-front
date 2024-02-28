

import './App.css'
import { Results } from './components/Results'
import { Fetch } from './components/fetch'
import { Row, Table } from './components/table'
import { ConfigProvider } from './context/config-context'
import { UseFetchReducerState } from './hooks/use-fetch-reducer'
import { useQuery } from './hooks/use-query'
import { Gender, Title } from './types/dtos'

export const transformConfig = ({ data }: {data: User[]}) => data

const mockUser: User = {
  gender: Gender.Male,
  name: {
    title: Title.Mr,
    first: 'John',
    last: 'Doe',
  },
  location: {
    street: {
      number: 123,
      name: 'Main Street',
    },
    city: 'New York',
    state: 'NY',
    country: 'USA',
    postcode: '10001',
    coordinates: {
      latitude: '40.7128',
      longitude: '-74.0060',
    },
    timezone: {
      offset: '-5:00',
      description: 'Eastern Standard Time',
    },
  },
  email: 'john.doe@example.com',
  login: {
    uuid: '1234567890',
    username: 'johndoe',
    password: 'password',
    salt: 'somesalt',
    md5: 'md5hash',
    sha1: 'sha1hash',
    sha256: 'sha256hash',
  },
  dob: {
    date: new Date('1990-01-01'),
    age: 31,
  },
  registered: {
    date: new Date('2021-01-01'),
    age: 1,
  },
  phone: '123-456-7890',
  cell: '987-654-3210',
  id: {
    name: 'SSN',
    value: '123-45-6789',
  },
  picture: {
    large: 'https://example.com/large.jpg',
    medium: 'https://example.com/medium.jpg',
    thumbnail: 'https://example.com/thumbnail.jpg',
  },
  nat: 'US',
}

function App() {
  //  const query = useQuery<User[]>({
  //    key: "PUBLIC_GET_USERS",
  //    transform: transformConfig,
  //  })

  const query: UseFetchReducerState<User[], Error> = {
    data: Array.from({ length: 10 }, () => mockUser),
    error: null,
    isLoading: false,
  }

  return (
    <div className="App">
      <h1>TEST</h1>
      <main>
        <Fetch
          {...query}
          loadingComponent={<strong>Cargando...</strong>}
          errorComponent={<p>Ha habido un error</p>}
        >
          {(data: User[]) => {
            if (data.length === 0) return <p>No hay usuarios</p>

            return (
              <Table
                headers={[
                  'Id',
                  'Username',
                  'Email',
                  'Phone Number',
                  'Location',
                ]}
                rows={data.map(
                  (user): Row => ({
                    id: user.id.value ?? '',
                    values: [
                      user.id.value ?? '',
                      user.email,
                      user.phone,
                      `${user.location.city}, ${user.location.state}`,
                    ],
                  })
                )}
              />
            )
          }}
        </Fetch>
      </main>
    </div>
  )
}

export default App
