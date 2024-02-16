import Entity from './Entity.jsx'
import Sidebar from './Sidebar.jsx'

function App() {
  return (
    <div className='p-2'>
      <div className='flex place-content-center'>
        <h1 className='text-3xl font-bold'>😈 DiceMaster 😈</h1>
      </div>
    <Sidebar></Sidebar>
    <Entity></Entity>
    </div>
  )
}

export default App
