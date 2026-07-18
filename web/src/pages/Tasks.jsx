import { useState } from 'react'
import { X } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'

export default function Tasks() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useOutletContext()
  const [value, setValue] = useState('')

  function handleAdd() {
    if (!value.trim()) return
    addTodo(value.trim())
    setValue('')
  }

  return (
    <div>
      <h1 className="text-3xl font-heading text-ink">To-do List</h1>
      <p className="text-sm text-ink-soft font-medium mt-1 mb-4">Small tasks add up.</p>

      <div className="bg-card rounded-lg p-5 mb-4 shadow">
        <div className="flex gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Add a task…"
            className="flex-1 px-4 py-3 rounded-full border border-line text-sm outline-none"
          />
          <button
            onClick={handleAdd}
            className="px-5 py-3 rounded-full font-heading font-bold text-sm bg-sage text-white"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-card rounded-lg p-5 shadow">
        {todos.length === 0 ? (
          <p className="text-center text-sm text-ink-soft font-medium py-4">
            Nothing on your list yet — add your first task above.
          </p>
        ) : (
          todos.map((t) => (
            <div key={t.id} className="flex items-center gap-2.5 py-2.5 border-b border-line last:border-0">
              <button
                onClick={() => toggleTodo(t.id)}
                className={`w-5 h-5 rounded-md border-2 border-sage flex-shrink-0 flex items-center justify-center text-[10px] text-white ${
                  t.done ? 'bg-sage' : ''
                }`}
              >
                {t.done ? '✓' : ''}
              </button>
              <span className={`text-sm font-medium flex-1 ${t.done ? 'line-through text-ink-soft' : 'text-ink'}`}>
                {t.text}
              </span>
              <button onClick={() => deleteTodo(t.id)} className="text-ink-faint">
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}