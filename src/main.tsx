import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider } from './context/config-context'
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient()

function Root({ children }) {
  return (
    <ChakraProvider>
      <ConfigProvider config={}>
        <App />
      </ConfigProvider>
    </ChakraProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
