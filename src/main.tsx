import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider } from './context/config-context'
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient()

function Root() {
  return (
    <ChakraProvider>
      <ConfigProvider config={import.meta.env as Record<string, string>}>
        <App />
      </ConfigProvider>
    </ChakraProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
