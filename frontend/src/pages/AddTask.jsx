import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import TaskForm from '../components/TaskForm.jsx'
import { createTask } from '../api/tasks.js'
import { useTasks } from '../state/TasksContext.jsx'

export default function AddTask() {
  const navigate = useNavigate(); const { setTasks } = useTasks()
  const [saving, setSaving] = useState(false); const [error, setError] = useState('')
  const submit = async (values) => { setSaving(true); setError(''); try { const task = await createTask(values); setTasks((items) => [task, ...items]); navigate('/tasks') } catch (err) { setError(err.message) } finally { setSaving(false) } }
  return <main className="form-page page-shell"><Link to="/tasks" className="back-link"><ArrowLeft size={15}/> Back to my tasks</Link><div className="form-layout"><div className="form-intro"><div className="eyebrow"><span className="eyebrow-line"/>A FRESH START</div><h1>One little thing<br/>at a <span>time.</span></h1><p>Give it a name, a place in your day, and you’re already a step closer.</p><div className="form-side-note"><span><Plus size={15}/></span><div><strong>Keep it simple.</strong><small>You can always add more detail later.</small></div></div></div><section className="form-card"><div className="form-card-heading"><div className="form-card-icon"><Plus size={17}/></div><div><span>NEW ITEM</span><h2>Create a task</h2></div></div><TaskForm onSubmit={submit} saving={saving} error={error}/></section></div><div className="form-page-footer">A THOUGHTFUL PLAN IS A KINDNESS TO YOUR FUTURE SELF.</div></main>
}
