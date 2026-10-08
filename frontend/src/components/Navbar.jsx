import { NavLink } from 'react-router-dom'
import { Check, Plus } from 'lucide-react'

export default function Navbar() {
  return <header className="topbar"><div className="topbar-inner">
    <NavLink to="/" className="brand"><span className="brand-mark"><Check size={16} strokeWidth={3} /></span><span>daymark<span className="brand-period">.</span></span></NavLink>
    <nav className="nav-links" aria-label="Main navigation">
      <NavLink to="/" end>Home</NavLink><NavLink to="/tasks">My tasks</NavLink>
    </nav>
    <NavLink to="/tasks/add" className="button button-dark nav-cta"><Plus size={16}/> New task</NavLink>
  </div></header>
}
