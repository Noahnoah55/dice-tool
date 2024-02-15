import Draggable from 'react-draggable'
import PropTypes from 'prop-types'
import { useState } from 'react'

function Entity() {
  const [editMode, setEditMode] = useState(false)
  const [attrs, setAttrs] = useState([{id: 1, name:"Name", val:"Jeff"}, {id: 2, name:"AC", val:"12"}])

  function toggleEdit() {
    if (editMode) {
      setEditMode(false)
    }
    else {
      setEditMode(true)
    }
  }

  function modifyAttr(id, name, val) {
    const allOtherAttrs = attrs.filter(attr => attr.id != id)
    setAttrs(allOtherAttrs.concat({id: id, name: name, val: val}))
    console.log(name)
  }

  function createModifier(id) {
    return (name, val) => modifyAttr(id, name, val)
  }

  const ListItems = attrs.map(attr =>
    <AttributeBox key={attr.id} attrName={attr.name} attrVal={attr.val} editMode={editMode} modifier={createModifier(attr.id)}/>)

  return <Draggable >
    <div className='bg-black w-60 border'>
      <table className='w-full'>
        {ListItems}
      </table>
      <button className='bg-blue-500 rounded hover:bg-blue-600' onClick={toggleEdit}>Edit</button>
    </div>
  </Draggable>
}

AttributeBox.propTypes = {
  attrName: PropTypes.string,
  attrVal: PropTypes.string,
  modifier: PropTypes.func,
  editMode: PropTypes.bool
}

function AttributeBox({
  attrName,
  attrVal,
  modifier,
  editMode
}) {

  const nameMod = (e) => modifier(e.target.value, attrVal)
  const valMod = (e) => modifier(attrName, e.target.value)

  return (
    <>
    {editMode ?
      <tr>
        <td><input value={attrName} onChange={nameMod} className='w-full'></input></td>
        <td><input value={attrVal} onChange={valMod} className='w-full'></input></td>
      </tr>
      :
      <tr>
        <td>{attrName}</td>
        <td>{attrVal}</td>
      </tr>
    }
    </>
  )
}

function App() {

  return (
    <div>
      <div className='flex place-content-center'>
        <h1 className='text-3xl font-bold'>😈 DiceMaster 😈</h1>
      </div>
    <Entity></Entity>
    </div>
  )
}

export default App
