import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownWideNarrow, ArrowRight, Check, CircleHelp, LoaderCircle, Plus, RotateCw, Sparkles } from 'lucide-react'
import { deleteTask, updateTask } from '../api/tasks.js'
import { useTasks } from '../state/TasksContext.jsx'
import TaskCard from '../components/TaskCard.jsx'

export default function Tasks() {
  const { tasks, setTasks, loading, error, refresh } = useTasks()
  const [filter, setFilter] = useState('ALL')
  const [notice, setNotice] = useState('')
  const [pending, setPending] = useState('')
  const filtered = useMemo(() => tasks.filter((task) => filter === 'ALL' || task.status === filter), [tasks, filter])
  const activeCount = tasks.filter((task) => task.status !== 'COMPLETED').length
  const completedCount = tasks.length - activeCount
  const toggle = async (task) => {
    setPending(task.id); setNotice('')
    try {
      const updated = await updateTask(task.id, { ...task, status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' })
      setTasks((items) => items.map((item) => item.id === task.id ? updated : item))
    } catch (err) { setNotice(err.message) }
    finally { setPending('') }
  }
  const remove = async (task) => {
    if (!window.confirm(`Delete “${task.title}”? This can’t be undone.`)) return
    setPending(task.id); setNotice('')
    try { await deleteTask(task.id); setTasks((items) => items.filter((item) => item.id !== task.id)) }
    catch (err) { setNotice(err.message) }
    finally { setPending('') }
  }
  return <main className="list-page page-shell"><div className="page-topline"><div className="eyebrow"><span className="eyebrow-line"/>YOUR PERSONAL SPACE</div><span className="topline-note"><Sparkles size={13}/> Make today count</span></div>
    <div className="list-heading-row"><div><h1>My <span>tasks.</span></h1><p className="list-subtitle">Small steps add up to great things.</p></div><Link to="/tasks/add" className="button button-dark"><Plus size={16}/> New task</Link></div>
    <section className="task-overview"><div className="overview-main"><div className="overview-icon"><ArrowDownWideNarrow size={18}/></div><div><span className="overview-kicker">A CLEAR PLAN</span><h2>{activeCount ? 'One thing at a time.' : tasks.length ? 'You’ve done enough.' : 'Begin where you are.'}</h2><p>{activeCount ? 'Pick a task. Give it your attention. That’s plenty.' : tasks.length ? 'You showed up and got things done. Take a breath.' : 'Put your first task down and make it real.'}</p></div></div><div className="overview-stats"><div><span>{String(tasks.length).padStart(2, '0')}</span><small>IN TOTAL</small></div><i/><div><span>{String(completedCount).padStart(2, '0')}</span><small>COMPLETED</small></div></div><span className="overview-watermark">DM</span></section>
    <div className="list-toolbar"><div className="filter-tabs" role="tablist" aria-label="Filter tasks">{[['ALL','All tasks'],['PENDING','In progress'],['COMPLETED','Completed']].map(([value,label])=><button key={value} role="tab" aria-selected={filter===value} className={filter===value?'active':''} onClick={()=>setFilter(value)}>{label}<span>{value==='ALL'?tasks.length:value==='PENDING'?activeCount:completedCount}</span></button>)}</div><span className="sort-label"><CircleHelp size={14}/> Sorted by date added</span></div>
    {notice && <div className="inline-error" role="alert">{notice}<button onClick={()=>setNotice('')}>Dismiss</button></div>}
    {loading ? <div className="loading-state"><LoaderCircle size={22} className="spin"/><span>Gathering your tasks…</span></div> : error ? <div className="empty-state"><div className="empty-icon error-empty"><CircleHelp size={22}/></div><h3>We couldn’t reach your tasks.</h3><p>{error}</p><button onClick={refresh} className="button button-outline"><RotateCw size={15}/> Try again</button></div> : filtered.length ? <div className="task-list">{filtered.map((task)=><div className={pending===task.id?'task-pending':''} key={task.id}><TaskCard task={task} onToggle={toggle} onDelete={remove}/></div>)}</div> : <div className="empty-state"><div className="empty-icon">{tasks.length ? <Check size={22}/> : <Plus size={22}/>}</div><h3>{tasks.length ? 'Nothing in this view.' : 'Your list is a blank canvas.'}</h3><p>{tasks.length ? 'Try another filter to see your tasks.' : 'Give your day a little direction. Add your first task.'}</p>{!tasks.length && <Link to="/tasks/add" className="button button-dark">Add your first task <ArrowRight size={15}/></Link>}</div>}
    <footer className="list-footer"><span>MADE FOR YOUR EVERYDAY</span><span>PROGRESS, NOT PERFECTION <i>✳</i></span></footer>
  </main>
}
