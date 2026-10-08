import { createContext, useContext, useEffect, useState } from 'react'
import { getTasks } from '../api/tasks.js'

const TasksContext = createContext(null)
export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const refresh = async () => {
    setLoading(true)
    try { setTasks(await getTasks()); setError('') }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }
  useEffect(() => { refresh() }, [])
  return <TasksContext.Provider value={{ tasks, setTasks, loading, error, refresh }}>{children}</TasksContext.Provider>
}
export function useTasks() { return useContext(TasksContext) }
