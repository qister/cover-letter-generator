import { Navigate, Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import { All, New } from './pages'
import { ApplicationsProvider } from './applicationsContext'
import { Layout } from './components'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ApplicationsProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='new' element={<New />} />
            <Route path='all' element={<All />} />
            <Route index element={<Navigate to='new' />} />
          </Route>
        </Routes>
      </ApplicationsProvider>
    </BrowserRouter>
  )
}

export default App
