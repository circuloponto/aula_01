"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';


export default function Home() {
  const [todos, setTodos] = useState([{ name: 'take trash out', id: uuidv4(), completed: true }])
  const [input, setInput] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(0)
  const addTodo = () => {
    setTodos([...todos, { name: input, id: uuidv4(), completed: false }])
    setInput('')

    if (editId) {
      const editTask = todos.find(task => task.id === editId)
      console.log('input', input)
      // const updatedTasks = todos.map(t => {
      //   t.id === editTask.id ? t = { ...t, name: input } : t = { ...t, name: t.name }
      // })
      const updatedTasks = todos.map(t => {
        if (t.id === editTask.id) {
          t.name = input
        }
        return t
      })
      setTodos(updatedTasks)
      setEditId(0)
      return
    }
  }
  console.log(todos)
  const handleEdit = (id) => {
    const editTask = todos.find(task => task.id === id)
    console.log('editTask', editTask)
    setInput(editTask.name)
    setEditId(id)
  }
  const handleDelete = (id) => {
    const updatedTasks = todos.filter(task => task.id !== id)
    setTodos(updatedTasks)
  }
  const check = todos.filter((task, i) => {
    console.log('task', task);
    console.log('input', input);
    let isPresent;
    if (input !== '') {
      isPresent = task.name
        .toLowerCase()
        .includes(input.toLowerCase());
    }


    return isPresent ? task : null;
  });
  console.log('check', check);
  const handleCheckbox = (e, id) => {
    console.log('handleCheckbox', e.target.checked)
    const findTodo = todos.find(task => task.id === id)
    console.log(findTodo)
    const updatedTasks = todos.map(t => {
      if (t.id === id) {
        console.log('its this one')
        t.completed = !t.completed
      }
      return t
    })
    console.log('updatedTasks', updatedTasks)
    setTodos(updatedTasks)
    // if (findTodo.completed === false) {
    //   const updatedTasks = todos.map(t => {
    //     if (t.id === id) {
    //       console.log('its this one')
    //       t.completed = true
    //     }
    //     return t
    //   })
    //   setTodos(updatedTasks)
    //   console.log('its not checked')
    // } else {
    //   console.log('its checked')
    //   const updatedTasks = todos.map(t => {
    //     if (t.id === id) {
    //       console.log('its this one')
    //       t.completed = false
    //     }
    //     return t
    //   })
    //   setTodos(updatedTasks)
    // }
  }
  return (

    <main className={styles.container}>
      <div className={styles.todolist}>
        <div className={styles.inputContainer}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={addTodo}>add</button>

        </div>
        {/* {check.map((item, i) => {
        return (
          <div key={i} className={styles.todo}>
            <span >{item.name}</span>

          </div>
        )
      })} */}
        <div className={styles.todos}>
          {input === '' && check.length === 0 && todos.map((todo, index) => (
            <div key={index} className={styles.todo} id={todo.id}>

              <div className={styles.task}>

                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.name}</span>
              </div>

              <div className={styles.btns}>
                <div className={styles.checkbox}>
                  <input onChange={(e) => handleCheckbox(e, todo.id)} type="checkbox" defaultChecked={todo.completed} />
                </div>


                <button className={styles.edit} onClick={() => handleEdit(todo.id)} >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                </button>
                <button className={styles.delete} onClick={() => handleDelete(todo.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.todos2}>
          {input !== '' && check.length !== 0 && check.map((todo, i) => {
            return (
              <div className={styles.todo} key={i} id={todo.id}>

                <div className={styles.checkbox}>
                  <input onChange={handleCheckbox} type="checkbox" defaultChecked={todo.completed} />
                </div>
                <div className={styles.task}>

                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.name}</span>
                </div>
                <div className={styles.btns}>
                  <button className={styles.edit} onClick={() => handleEdit(todo.id)} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                  <button className={styles.delete} onClick={() => handleDelete(todo.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </button>
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.todos3}>
          {input !== '' && check.length === 0 && todos.map((todo, i) => {
            return (
              <div className={styles.todo} key={i} id={todo.id}>
                <div className={styles.checkbox}>
                  <input onChange={handleCheckbox} type="checkbox" defaultChecked={todo.completed} />
                </div>
                <div className={styles.task}>

                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.name}</span>
                </div>
                <div className={styles.btns}>



                  <button className={styles.edit} onClick={() => handleEdit(todo.id)} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                  </button>
                  <button className={styles.delete} onClick={() => handleDelete(todo.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
