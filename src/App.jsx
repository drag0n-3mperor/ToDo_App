import { useState, useEffect, useRef } from "react";
import React from 'react'
import Card from "./components/Card.jsx";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const addTodoFieldRef = useRef(null)
  const [todoList, setTodoList] = useState([])
  const [addTodoText, setAddTodoText] = useState('')

  const saveToLS = (todoList) => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  function NothingToShow() {
    if (todoList.length == 0)
      return (
        <div className="text-4xl mx-auto text-slate-700">No ToDos' to show!!</div>
      )
  }

  const handleChange = (e) => {
    setAddTodoText(e.target.value)
  }
  
  const handleSave = (e) => {
    if (!addTodoText.toString()) {
      alert('Please enter a valid note.')
      return
    }
    let newArr = [...todoList]
    newArr.push({ id: uuidv4(), text: addTodoText, isCompleted: false })
    setTodoList(newArr)
    setAddTodoText('')
    saveToLS(newArr)
  }
  
  useEffect(() => {
    const storedItem = localStorage.getItem("todoList");
    if (storedItem) {
      const newArr = JSON.parse(storedItem)
      setTodoList(newArr)
    }
  }, [])

  // useEffect(() => {
    // let storedItem = localStorage.getItem("todoList");
    // console.log(1, storedItem, todoList)
    // localStorage.setItem("todoList", JSON.stringify(todoList));
    // const storedItem = localStorage.getItem("todoList")
    // if (storedItem) {
    //   const newArr = JSON.parse(storedItem)
    //   setTodoList(newArr)
    // }
    // console.log(2, storedItem, todoList)
  // }, [todoList])

  
  return (
    <div className="w-screen h-screen">
      <div className="text-4xl font-bold bg-violet-950 text-white text-center py-4 mx-auto w-full">ToDo List App</div>
      <div className="flex justify-center w-full" style={{ alignItems: 'center', minHeight: '80%' }}>
        <div className="w-2/3 border-2 border-black rounded-lg bg-violet-200 my-8" style={{ alignItems: 'center', minHeight: '60%' }}>
          <div className="text-black text-2xl font-semibold text-center my-2">Your ToDos'</div>
          <div className="flex justify-center gap-8 my-2">
            <input ref={addTodoFieldRef} onChange={handleChange} value={addTodoText} className="border border-black rounded-lg w-1/2 px-4" type="text" name="add-todo" id="add-todo" />
            <input onClick={handleSave} className="border border-black cursor-pointer py-1 px-4 rounded-full" type="submit" value="Save" />
          </div>
          <div className="flex flex-col justify-center bg-violet-100 w-3/4 mx-auto p-4 rounded-3xl my-8">
            {<NothingToShow />}
            {todoList.map((todo) => {
              return <Card key={todo.id} todo={todo} addTodoText={addTodoText} setAddTodoText={setAddTodoText} todoList={todoList} setTodoList={setTodoList} addTodoFieldRef={addTodoFieldRef} saveToLS={saveToLS} />
            })}
          </div>
          {/* <div className="w-full flex justify-end pr-8 my-8">
            <button className="py-1 px-4 rounded-md bg-blue-700 text-lg text-white cursor-pointer hover:bg-violet-900 duration-300">Save Changes</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default App
