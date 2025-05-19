import Theme from '@/components/template/Theme'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/auth'
import Layout from '@/components/layouts'
import Views from './views'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <BrowserRouter>
            <AuthProvider>
              <Layout>
                <Views />
              </Layout>
            </AuthProvider>
          </BrowserRouter>
        </Theme>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
