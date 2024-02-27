import './App.css'
import { Results } from './components/Results'
import { Fetch } from './components/fetch'
import { Table } from './components/table'
import { ConfigProvider } from './context/config-context'
import { useQuery } from './hooks/use-query'
import { GetUserElementResponse, UserElement } from './types/dtos'

export const transformConfig = ({ data }: GetUserElementResponse) => data

function App() {
  const envConfig = {
    getUsersEndpoint: process.env.PUBLIC_GET_USERS ?? '',
    // Add more variables as needed
  }
  const query = useQuery({
    key: 'PUBLIC_GET_USERS',
    transform: transformConfig,
  })

  return (
    <div className="App">
      <h1>TEST</h1>
      <main>
        <Fetch
          {...query}
          loadingComponent={<strong>Cargando...</strong>}
          errorComponent={<p>Ha habido un error</p>}
        >
          {(data: GetUserElementResponse) => {
            if (data.length === 0) return <p>No hay usuarios</p>

            return (
              <Table
                headers={['Id', 'Username', 'Email', 'Phone Number']}
                data={data}
              />
            )
          }}
        </Fetch>
      </main>
    </div>
  )
}

export default App
