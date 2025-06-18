import './App.css'

function App() {
  return (
    <div className="w-screen h-screen bg-violet-950">
      <div className='flex justify-center pt-20'>
        <img src="../pics/computer-logo-internet-png-favpng-bAJctcX18wnUDEZsgq9i1tEb3-removebg-preview.png" alt="webinar-logo" className='w-12 h-12 mr-3'/>
        <div className="text-white text-4xl">Webinar.gg</div>
      </div>
      <div>
        <h1 className='font-mono text-white text-center my-30 text-3xl font-semibold font-sans'>Verify Your Age</h1>
      </div>
      <div className='flex justify-center mt-10 text-gray-300 text-lg'>
        Please confirm your birth year. This data will not be stored.
      </div>
      <div className='text-center mt-4'>
        <input id='true' type="text" placeholder="Your Birth Year" className='bg-gray-500 rounded-lg pl-3 w-100 h-12'/>
      </div>
      <div className='text-center mt-9'>
        <button className='bg-gray-600 hover:bg-gray-700 w-100 h-12 rounded-lg pointer'>Continue</button>
      </div>
    </div>
  )
}

export default App
