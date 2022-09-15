import { Routes, Route, Link } from 'react-router-dom'
import { Button } from 'components/Button'
import { useTheme, Theme } from 'providers/ThemeProvider'

function App() {
  const [theme, setTheme] = useTheme()

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT))
  }

  return (
    <div className='bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen'>
      <div className='container mx-auto py-6'>
        <h1 className='text-3xl font-bold underline'>Hello world!!</h1>
        <Button onClick={toggleTheme}>{theme}</Button>
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
    </div>
  )
}

export default App
