import PropTypes from 'prop-types'
import { useState } from 'react'
import Draggable from 'react-draggable'

export default function Entity() {
  const [editMode, setEditMode] = useState(false)
  const [attrs, setAttrs] = useState([{id:1, name:"HP", val:"30"}, {id: 2, name:"AC", val:"12"}])
  const [name, setName] = useState("<Name>")

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
    const newlist = allOtherAttrs.concat({id: id, name: name, val: val})
    setAttrs(newlist.sort((a, b) => a.id - b.id))
  }

  function createModifier(id) {
    return (name, val) => modifyAttr(id, name, val)
  }

  function addAttr() {
    const maxID = attrs.reduce((lowest, currval) => Math.max(lowest, currval.id), 0)
    setAttrs(attrs.concat({id:maxID+1, name:"Attribute Name", val:"Attribute Value"}))
  }

  const ListItems = attrs.map(attr =>
    <AttributeBox key={attr.id} attrName={attr.name} attrVal={attr.val} editMode={editMode} modifier={createModifier(attr.id)} toggleEdit={toggleEdit}/>)

  return <Draggable disabled={editMode}>
    <div className='inline-block h-full bg-gray-700 p-2'>
      {editMode ? <input value={name} onChange={(e) => setName(e.target.value)}></input> : <div>{name}</div> }
      <div className='overflow-y-scroll bg-black'>
        <table className='w-full'>
          {ListItems}
        </table>
      </div>
      <button className='bg-blue-500 rounded hover:bg-blue-600' onClick={toggleEdit}>Edit</button>
      <button className='bg-blue-500 rounded hover:bg-blue-600' onClick={addAttr}>Add Attribute</button>
    </div>
  </Draggable>
}

AttributeBox.propTypes = {
  attrName: PropTypes.string,
  attrVal: PropTypes.string,
  modifier: PropTypes.func,
  editMode: PropTypes.bool,
  toggleEdit: PropTypes.func,
}

function AttributeBox({
  attrName,
  attrVal,
  modifier,
  editMode,
  toggleEdit
}) {

  const nameMod = (e) => modifier(e.target.value, attrVal)
  const valMod = (e) => modifier(attrName, e.target.value)

  function checkEnter(e) {
    if (e.key == "Enter") {
      toggleEdit()
    }
  }

  return (
    <>
    {editMode ?
      <tr>
        <td><input value={attrName} onChange={nameMod} onKeyDown={checkEnter} className='w-full'></input></td>
        <td><input value={attrVal} onChange={valMod} onKeyDown={checkEnter} className='w-full'></input></td>
      </tr>
      :
      <tr>
        <td className='whitespace-nowrap'>{attrName}</td>
        <td className='whitespace-nowrap'>{attrVal}</td>
      </tr>
    }
    </>
  )
}