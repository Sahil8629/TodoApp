import React, { useState } from 'react'
import { useTodo } from '../Context/TodoContext'
import { motion } from "framer-motion"

function TodoForm() {
    const [todo,setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e)=>{
        e.preventDefault()
        if(!todo) return 
        addTodo({todo,completed: false})
        setTodo("")
    }

    return (
      <motion.form 
        onSubmit={add}
        className="flex items-center"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <input
          type="text"
          placeholder="Write a new task..."
          className="w-full rounded-l-lg px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={todo}
          onChange={(e)=> setTodo(e.target.value)}
        />

        <button 
          type="submit" 
          className="rounded-r-lg px-5 py-2 bg-blue-600 hover:bg-blue-700 transition font-semibold"
        >
          Add +
        </button>
      </motion.form>
    )
}

export default TodoForm
