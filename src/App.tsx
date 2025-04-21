import { Navigate, Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import { All, New } from './pages'
import { ApplicationsCountProvider } from './totalApplicationsContext'
import { Layout } from './components'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ApplicationsCountProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='new' element={<New />} />
            <Route path='all' element={<All />} />
            <Route index element={<Navigate to='new' />} />
          </Route>
        </Routes>
      </ApplicationsCountProvider>
    </BrowserRouter>
  )
}

export default App
