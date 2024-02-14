import Draggable from 'react-draggable'

function DiceBox() {
  return (
    <Draggable>
      <div className='bg-black w-40'>
        <table>
          <th>Name</th>
          <tr>
            <td>AC</td>
            <td>16</td>
          </tr>
          <tr>
            <td>Prof</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Bonus</td>
            <td>2</td>
          </tr>
        </table>
      </div>
    </Draggable>
  )
}

function App() {

  return (
    <div>
      <div className='flex place-content-center'>
        <h1 className='text-3xl font-bold'>😈 DiceMaster 😈</h1>
      </div>
    <DiceBox></DiceBox>
    <DiceBox></DiceBox>
    <DiceBox></DiceBox>
    <DiceBox></DiceBox>
    </div>
  )
}

export default App
