import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Tasks from './pages/Tasks.jsx'
import AddTask from './pages/AddTask.jsx'
import EditTask from './pages/EditTask.jsx'
import { TasksProvider } from './state/TasksContext.jsx'

export default function App() {
  return <TasksProvider><div className="app-shell"><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/tasks" element={<Tasks/>}/><Route path="/tasks/add" element={<AddTask/>}/><Route path="/tasks/edit/:id" element={<EditTask/>}/><Route path="*" element={<Home/>}/></Routes></div></TasksProvider>
}
