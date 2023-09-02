import { Routes, Route } from 'react-router-dom'

import { Navbar } from 'components/Navbar'
import { Footer } from 'components/Footer'
import { Home, Sets, Set, Search } from 'pages'

function App() {
  return (
    <div className='bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col'>
      <Navbar />
      <div className='container mx-auto py-2'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='sets' element={<Sets />} />
          <Route path='sets/:id' element={<Set />} />
          <Route path='search' element={<Search />} />
          <Route path='*' element={<>404</>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
