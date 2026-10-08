import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowRight, Check, Circle, Plus } from 'lucide-react'
import { useTasks } from '../state/TasksContext.jsx'

export default function Home() {
  const { tasks, loading } = useTasks()
  const completed = tasks.filter((task) => task.status === 'COMPLETED').length
  const remaining = tasks.length - completed
  const featured = tasks.find((task) => task.status !== 'COMPLETED')
  return <main className="home-page page-shell">
    <div className="hero-grid"><section className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/>YOUR DAY, IN GOOD HANDS</div>
      <h1>Make room for<br/>what <span>matters.</span></h1>
      <p className="hero-description">A little more clarity. A little less noise.<br className="desktop-break"/> Your next good day starts with one small step.</p>
      <div className="hero-actions"><Link to="/tasks" className="button button-dark">See my tasks <ArrowRight size={16}/></Link><Link to="/tasks/add" className="button button-quiet"><Plus size={17}/> Add a task</Link></div>
      <div className="hero-footnote"><span className="tiny-check"><Check size={12}/></span> Progress over perfection, always.</div>
    </section>
    <aside className="today-card"><div className="today-card-top"><span className="today-label">A QUICK LOOK</span><span className="live-indicator"><i/> TODAY</span></div>
      <div className="date-heading">{new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</div>
      <div className="progress-block"><div className="progress-copy"><span>YOUR MOMENTUM</span><span>{loading ? '—' : `${completed} of ${tasks.length}`}</span></div><div className="progress-track"><span style={{ width: `${tasks.length ? completed / tasks.length * 100 : 0}%` }}/></div><p>{loading ? 'Gathering your tasks…' : remaining ? `${remaining} ${remaining === 1 ? 'thing' : 'things'} to focus on` : tasks.length ? 'Everything is wrapped up. Nice work.' : 'Every big thing starts somewhere.'}</p></div>
      <div className="next-up"><div className="next-up-heading"><span>NEXT UP</span><ArrowDownRight size={15}/></div>{featured ? <div className="featured-task"><Circle size={17}/><span>{featured.title}</span></div> : <div className="featured-task muted-task"><Check size={16}/><span>{tasks.length ? 'A clear plate — enjoy it.' : 'Start with one small task.'}</span></div>}</div>
      <Link className="today-link" to="/tasks">Open your task list <ArrowRight size={14}/></Link>
      <span className="card-watermark">01</span>
    </aside></div>
    <div className="home-bottom"><span>BUILT FOR A LITTLE MORE CALM</span><span><span className="bottom-divider"/> ONE STEP AT A TIME</span><span>DAYMARK ®</span></div>
  </main>
}
