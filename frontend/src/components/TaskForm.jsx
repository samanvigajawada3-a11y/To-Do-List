import { useState } from 'react'
import { ArrowLeft, CalendarDays, Check, CircleHelp, LoaderCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TaskForm({ initialTask, onSubmit, saving, error }) {
  const [values, setValues] = useState({ title: initialTask?.title || '', description: initialTask?.description || '', status: initialTask?.status || 'PENDING', dueDate: initialTask?.dueDate || '' })
  const [validation, setValidation] = useState('')
  const change = (event) => setValues({ ...values, [event.target.name]: event.target.value })
  const submit = async (event) => {
    event.preventDefault()
    if (!values.title.trim()) { setValidation('Give your task a title to get started.'); return }
    setValidation('')
    await onSubmit({ ...values, title: values.title.trim(), description: values.description.trim(), dueDate: values.dueDate || null })
  }
  return <form className="task-form" onSubmit={submit}>
    <label className="field-label" htmlFor="title">Task name <span className="required-star">*</span></label>
    <input id="title" name="title" value={values.title} onChange={change} maxLength={120} placeholder="e.g. Prepare project presentation" autoFocus />
    <div className="field-hint"><span>Make it clear and actionable</span><span>{values.title.length}/120</span></div>
    <label className="field-label" htmlFor="description">Notes <span className="optional-label">Optional</span></label>
    <textarea id="description" name="description" value={values.description} onChange={change} maxLength={2000} placeholder="Add a few details to help you remember…" rows={4}/>
    <div className="field-hint"><span>Any extra context or details</span><span>{values.description.length}/2000</span></div>
    <div className="form-row">
      <div className="form-column"><label className="field-label" htmlFor="dueDate">Due date <span className="optional-label">Optional</span></label><div className="input-icon-wrap"><CalendarDays size={16}/><input id="dueDate" name="dueDate" type="date" value={values.dueDate} onChange={change}/></div></div>
      <div className="form-column"><label className="field-label" htmlFor="status">Status</label><div className="input-icon-wrap status-select-icon">{values.status === 'COMPLETED' ? <Check size={16}/> : <CircleHelp size={16}/>}<select id="status" name="status" value={values.status} onChange={change}><option value="PENDING">In progress</option><option value="COMPLETED">Completed</option></select></div></div>
    </div>
    {(validation || error) && <p className="form-error" role="alert">{validation || error}</p>}
    <div className="form-footer"><Link to="/tasks" className="button button-quiet"><ArrowLeft size={16}/> Cancel</Link><button type="submit" className="button button-dark" disabled={saving}>{saving && <LoaderCircle size={16} className="spin"/>}{saving ? 'Saving…' : initialTask ? 'Save changes' : 'Create task'}</button></div>
  </form>
}
