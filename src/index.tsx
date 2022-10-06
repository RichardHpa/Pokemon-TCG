import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from 'providers/ThemeProvider'

async function main() {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

  if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK_API === 'true') {
    if (window.location.pathname === '/Demo-App') {
      window.location.pathname = '/Demo-App/'
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = require('./mocks/browser')
    await worker.start({
      serviceWorker: {
        url: '/Demo-App/mockServiceWorker.js',
      },
    })
  }

  root.render(
    <React.StrictMode>
      <HashRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </HashRouter>
    </React.StrictMode>,
  )
}

main()
