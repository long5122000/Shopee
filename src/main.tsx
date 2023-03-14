import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppProvider } from './contexts/app.context'
import ErrorBoundary from './components/ErrorBoundary'
import 'src/i18n/i18n'
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
