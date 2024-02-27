import './App.css'
import { Results } from './components/Results'
import { ConfigProvider } from './context/config-context'
import { useQuery } from './hooks/use-query'
import { GetUserElementResponse, UserElement } from './types/dtos'

export const transformConfig = ({ data }: GetUserElementResponse) => data

function App() {
  const envConfig = {
    getUsersEndpoint: process.env.PUBLIC_GET_USERS ?? '',
    // Add more variables as needed
  }
  const {
    data: userList,
    isLoading: isLoading,
    isError: isError,
  } = useQuery({
    key: 'PUBLIC_GET_USERS',
    transform: transformConfig,
  })

  return (
    <ConfigProvider config={envConfig}>
      <div className="App">
        <h1>TEST</h1>
        <main>
          {userList &&
            userList.length > 0 &&
            userList.map((user: UserElement) => <>{user.firstName}</>)}

          {isLoading && <strong>Cargando...</strong>}

          {isError && <p>Ha habido un error</p>}

          {!isLoading && !isError && userList && userList.length === 0 && (
            <p>No hay usuarios</p>
          )}
        </main>
      </div>
    </ConfigProvider>
  )
}

export default App
