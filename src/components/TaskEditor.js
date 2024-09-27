// src/components/TaskEditor.js
import React, { useState } from 'react';

const TaskEditor = ({ onSave, task = { name: '', effort: 1, dependentOnTaskId: null }, onCancel, tasks }) => {
  const [name, setName] = useState(task.name);
  const [effort, setEffort] = useState(task.effort || 1);
  const [dependentOnTaskId, setDependentOnTaskId] = useState(task.dependentOnTaskId || '');

  const handleSave = () => {
    onSave({ ...task, name, effort, dependentOnTaskId });
  };

  return (
    <div className="task-editor">
      <h3>{task.id ? 'Edit Task' : 'Add Task'}</h3>
      <label>
        Task Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Effort:
        <input type="number" value={effort} onChange={(e) => setEffort(Number(e.target.value))} />
      </label>
      <label>
        Dependent on Task:
        <select value={dependentOnTaskId} onChange={(e) => setDependentOnTaskId(e.target.value)}>
          <option value="">None</option>
          {tasks.filter(t => t.id !== task.id).map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskEditor;
