
import React, { useState, useRef } from 'react'

function Card({ todo, addTodoText, setAddTodoText, todoList, setTodoList, addTodoFieldRef }) {
  const [checked, setChecked] = useState(false)

  const handleChange = (e) => {
    todo.isCompleted = !checked
    setChecked(todo.isCompleted)
  }

  const handleEdit = (e) => {
    const id = e.target.name.toString()
    const newArr = todoList.filter(item => item.id !== id )
    setTodoList(newArr)
    todoList.forEach(elem => {
      if (elem.id === id) {
        setAddTodoText(elem.text)
      }
    })
    // handleDel(e)
    if (addTodoFieldRef.current) addTodoFieldRef.current.focus();
  }
  
  const handleDel = (e) => {
    const id = e.target.name.toString()
    const newArr = todoList.filter(item => item.id !== id )
    setTodoList(newArr)
  }

  return (
    <div className='flex justify-between my-1'>
      <div className="flex px-4 py-1 gap-2">
        <input onChange={handleChange} value={checked} type="checkbox" name="is-complete" id="is-complete" />
        <span className="text-wrap" style={{opacity: todo.isCompleted?'0.1':'1.0'}}>{todo.text}</span>
      </div>
      <div className="flex flex-nowrap justify-center gap-1" style={{ alignItems: 'center' }}>
        <input onClick={handleEdit} name={todo.id} className='px-4 py-1 border border-black rounded-md cursor-pointer' type="button" value="Edit" />
        <input onClick={handleDel} name={todo.id} className='px-4 py-1 border border-black rounded-md cursor-pointer' type="button" value="Delete" />
      </div>
    </div>
  )
}

export default Card