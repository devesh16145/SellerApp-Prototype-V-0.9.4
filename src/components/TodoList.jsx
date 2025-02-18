import React from 'react'

const todos = [
  { id: 1, task: "Update product prices", day: "Today" },
  { id: 2, task: "Respond to customer queries", day: "Today" },
  { id: 3, task: "Schedule next week's promotions", day: "Tomorrow" },
];

export default function TodoList() {
  return (
    <div className="bg-white p-2 rounded-lg shadow-md">
      <h2 className="font-bold text-base mb-1">To Do List</h2>
      <ul className="space-y-1">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <input type="checkbox" id={`todo-${todo.id}`} className="form-checkbox h-3.5 w-3.5 text-agri-green rounded border-gray-300 focus:ring-agri-green" />
              <label htmlFor={`todo-${todo.id}`} className="text-gray-700 text-xs">{todo.task}</label>
            </div>
            <span className="text-xxs text-gray-500">{todo.day}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
