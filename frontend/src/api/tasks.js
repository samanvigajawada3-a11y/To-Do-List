const API_URL = import.meta.env.VITE_API_URL || 'https://to-do-list-lb6s.onrender.com/api'

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    })
  } catch {
    throw new Error('Unable to reach the server. Check that the backend is running.')
  }
  if (!response.ok) {
    let message = 'Something went wrong. Please try again.'
    try { message = (await response.json()).message || message } catch { /* keep fallback */ }
    throw new Error(message)
  }
  return response.status === 204 ? null : response.json()
}

export const getTasks = () => request('/tasks')
export const createTask = (task) => request('/tasks', { method: 'POST', body: JSON.stringify(task) })
export const updateTask = (id, task) => request(`/tasks/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(task) })
export const deleteTask = (id) => request(`/tasks/${encodeURIComponent(id)}`, { method: 'DELETE' })
