import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil } from 'lucide-react'
import TaskForm from '../components/TaskForm.jsx'
import { updateTask } from '../api/tasks.js'
import { useTasks } from '../state/TasksContext.jsx'

export default function EditTask() {
  const { id } = useParams(); const navigate = useNavigate(); const { tasks, setTasks } = useTasks()
  const [saving, setSaving] = useState(false); const [error, setError] = useState('')
  const task = tasks.find((item) => item.id === id)
  useEffect(() => { if (!task) setError('This task could not be found. It may have been deleted.') }, [task])
  const submit = async (values) => { setSaving(true); setError(''); try { const updated = await updateTask(id, values); setTasks((items) => items.map((item) => item.id === id ? updated : item)); navigate('/tasks') } catch (err) { setError(err.message) } finally { setSaving(false) } }
  return <main className="form-page page-shell"><Link to="/tasks" className="back-link"><ArrowLeft size={15}/> Back to my tasks</Link><div className="form-layout"><div className="form-intro"><div className="eyebrow"><span className="eyebrow-line"/>A SMALL ADJUSTMENT</div><h1>Make it work<br/>for <span>you.</span></h1><p>Plans shift. Give your task a quick update and keep moving.</p><div className="form-side-note"><span><Pencil size={15}/></span><div><strong>Stay flexible.</strong><small>A good plan makes room for change.</small></div></div></div><section className="form-card"><div className="form-card-heading"><div className="form-card-icon"><Pencil size={16}/></div><div><span>EDITING TASK</span><h2>Update your task</h2></div></div>{task ? <TaskForm key={task.id} initialTask={task} onSubmit={submit} saving={saving} error={error}/> : <div className="form-load-error">{error || 'Loading your task…'}<Link to="/tasks">Return to your tasks <ArrowLeft size={14}/></Link></div>}</section></div><div className="form-page-footer">A THOUGHTFUL PLAN IS A KINDNESS TO YOUR FUTURE SELF.</div></main>
}
