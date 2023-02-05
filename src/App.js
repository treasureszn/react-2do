import  React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4} from 'uuid';



const local_Storage_Key = "todoApp.todos"

function App() {
    const [todos, SetTodos] =  useState([])
    const TodoNameRef = useRef()


useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem
  (local_Storage_Key))
  if(storedTodos) SetTodos(storedTodos)
}, [])

useEffect(()=> {
  localStorage.setItem(local_Storage_Key, JSON.stringify(todos))
}, [todos])


function toggleTodo(id) {
 const newTodos = [...todos]
 const todo = newTodos.find(todo => todo.id === id)
 todo.complete = !todo.complete
 SetTodos(newTodos)
}

function handleClearTodos(){
  const newTodos = todos.filter(todo => todo.complete)
  SetTodos(newTodos)
}


    function handleAddTodo(e){
     const name = TodoNameRef.current.value
     if (name === "") return
     SetTodos(prevTodos => {
      return [...prevTodos, {id:uuidv4(), name:name, complete:false}]
     })
     TodoNameRef.current.value = null
    }

    return (
      <>
        <TodoList todos = {todos} toggleTodo = {toggleTodo} />
        <input ref={TodoNameRef} type='text'/>
        <button onClick={handleAddTodo}>Add Task</button>
        <button onClick={handleClearTodos} >Clear completed tasks</button>
        <div>{todos.filter(todo => !todo.complete).length} tasks left</div>
      </>
    )
}

export default App;
