import { Routes, Route } from 'react-router-dom'

import { Navbar } from 'components/Navbar'

function App() {
  return (
    <div className='bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen'>
      <Navbar />
      <div className='container mx-auto py-6'>
        <Routes>
          <Route path='/' element={<>Home</>} />
          <Route path='about' element={<>About</>} />
          <Route path='*' element={<>404</>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
