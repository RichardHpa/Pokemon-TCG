function Copyright() {
  return (
    <p>
      {'Copyright © '}
      {new Date().getFullYear()}
    </p>
  )
}

export const Footer = () => {
  return (
    <footer className='px-2 sm:px-4 mt-auto'>
      <div className='container mx-auto border-t py-4'>
        <Copyright />
      </div>
    </footer>
  )
}
