import { useEffect, useState } from 'react'
import './App.css'
import { Todoprovider } from './Context/TodoContext'
import { TodoItems, TodoForm } from './Components'
import { motion } from "framer-motion"

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo)=>{
    setTodos((prev)=>[{id: Date.now(),...todo},...prev])
  }

  const updateTodo = (id,todo) =>{
    setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id === id ? todo : prevTodo))
  }

  const deleteTodo =(id)=>{
    setTodos((prev)=> prev.filter((todo)=> todo.id !== id))
  }

  const toggleComplete = (id)=>{
    setTodos((prev) => prev.map((prevTodo)=> prevTodo.id === id ? {...prevTodo,completed:!prevTodo.completed}:prevTodo ))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length>0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])

  return (
    <Todoprovider value={{addTodo,deleteTodo,updateTodo,todos,toggleComplete}}>
      <div className="bg-[#101A32] min-h-screen py-10 px-4">
        
        <motion.div 
          className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-2xl px-6 py-6 text-white border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-extrabold text-center mb-8 tracking-wide">
            ✨ Your Todo Manager
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-5">
            <TodoForm />
          </motion.div>

          <div className="flex flex-col space-y-3">
            {todos.map(todo => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <TodoItems todo={todo} />
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </Todoprovider>
  )
}

export default App
