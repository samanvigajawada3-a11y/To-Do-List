import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Check, Circle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

function formatDate(date) {
  if (!date) return null
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
}

export default function TaskCard({ task, onToggle, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const overdue = task.status !== 'COMPLETED' && task.dueDate && new Date(`${task.dueDate}T23:59:59`) < new Date()
  return <article className={`task-card ${task.status === 'COMPLETED' ? 'task-done' : ''}`}>
    <button className={`task-check ${task.status === 'COMPLETED' ? 'checked' : ''}`} onClick={() => onToggle(task)} aria-label={task.status === 'COMPLETED' ? 'Mark as pending' : 'Mark as completed'}>
      {task.status === 'COMPLETED' ? <Check size={14} strokeWidth={2.7}/> : <Circle size={20} strokeWidth={1.5}/>}
    </button>
    <div className="task-copy"><h3>{task.title}</h3>{task.description && <p>{task.description}</p>}
      <div className="task-meta"><span className={`status-pill ${task.status === 'COMPLETED' ? 'status-complete' : 'status-pending'}`}><span className="status-dot"/>{task.status === 'COMPLETED' ? 'Completed' : 'In progress'}</span>
        {task.dueDate && <span className={`due-date ${overdue ? 'overdue' : ''}`}><CalendarDays size={13}/>{overdue ? 'Overdue · ' : ''}{formatDate(task.dueDate)}</span>}
      </div>
    </div>
    <div className="task-actions"><Link className="icon-button edit-button" to={`/tasks/edit/${task.id}`} aria-label={`Edit ${task.title}`}><Pencil size={15}/></Link>
      <div className="menu-wrap"><button className="icon-button" aria-label="More actions" onClick={() => setMenuOpen(!menuOpen)}><MoreHorizontal size={18}/></button>
        {menuOpen && <><button className="menu-dismiss" aria-label="Close actions" onClick={() => setMenuOpen(false)}/><div className="action-menu"><Link to={`/tasks/edit/${task.id}`} onClick={() => setMenuOpen(false)}><Pencil size={14}/> Edit task</Link><button className="danger-action" onClick={() => { setMenuOpen(false); onDelete(task) }}><Trash2 size={14}/> Delete task</button></div></>}
      </div>
    </div>
  </article>
}
