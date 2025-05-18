import Theme from '@/components/template/Theme'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/auth'
import Layout from '@/components/layouts'
import Views from './views'
import { Provider } from 'react-redux'
import { store } from '@/store'

function App() {

  return (
    <Provider store={store}>
      <Theme>
        <BrowserRouter>
          <AuthProvider>
            <Layout>
              <Views />
            </Layout>
          </AuthProvider>
        </BrowserRouter>
      </Theme>
    </Provider>
  )
}

export default App
