import React, { useState } from 'react'
import { useTodo } from '../Context/TodoContext'
import { motion } from "framer-motion"

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)

    const { toggleComplete, updateTodo , deleteTodo } = useTodo()

    const editTodo =() => {
        updateTodo(todo.id,{...todo , todo: todoMsg})
        setIsTodoEditable(false)
    }

    const toggleCompleted = ()=>{
        toggleComplete(todo.id)
    }

    return (
        <motion.div 
          className={`flex items-center border border-white/20 rounded-xl px-4 py-2 gap-x-3 shadow-md backdrop-blur bg-white/10 transition ${
            todo.completed ? "bg-green-300/30" : "bg-purple-300/20"
          }`}
          whileHover={{ scale: 1.02 }}
        >
            <input
                type="checkbox"
                className="cursor-pointer h-5 w-5"
                checked={todo.completed}
                onChange={toggleCompleted}
            />

            <input
                type="text"
                className={`w-full bg-transparent text-white outline-none ${
                    isTodoEditable ? "border-b border-white" : "border-none"
                } ${todo.completed ? "line-through text-gray-300" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            {/* Edit / Save */}
            <button
                className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition"
                onClick={() => {
                    if (todo.completed) return;
                    if (isTodoEditable) editTodo();
                    else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "💾" : "✏️"}
            </button>

            {/* Delete */}
            <motion.button
                className="px-3 py-1 rounded-lg bg-red-500/40 hover:bg-red-500/60 transition"
                onClick={() => deleteTodo(todo.id)}
                whileTap={{ scale: 0.9 }}
            >
                ❌
            </motion.button>

        </motion.div>
    )
}

export default TodoItem
