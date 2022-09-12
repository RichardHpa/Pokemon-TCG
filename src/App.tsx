import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <h1 className='text-3xl font-bold underline'>Hello world!!</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/users'>Users (Should 404)</Link>
        </li>
      </ul>
      <hr />
      <Routes>
        <Route path='/' element={<>Home</>} />
        <Route path='about' element={<>About</>} />
        <Route path='*' element={<>404</>} />
      </Routes>
    </div>
  )
}

export default App
