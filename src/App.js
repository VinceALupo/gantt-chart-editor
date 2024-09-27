// src/App.js
import React, { useState } from 'react';
import TaskEditor from './components/TaskEditor';
import TaskGrid from './components/TaskGrid';
import moment from 'moment';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

const adjustTaskDates = (tasks) => {
  const taskMap = new Map(tasks.map(t => [String(t.id), t])); // Convert ID to string

  const calculateDates = (task) => {
    const dependentTaskId = String(task.dependentOnTaskId); // Ensure dependentOnTaskId is a string
    const dependentTask = taskMap.get(dependentTaskId);
  
    if (!task.dependentOnTaskId) {
      // No dependency
      task.start = moment('2024-09-01').format('YYYY-MM-DD');
    } else if (dependentTask) {
      // Valid dependent task
      if (!dependentTask.end) {
        calculateDates(dependentTask); // Calculate dependent task's dates first
      }
      task.start = moment(dependentTask.start).add(dependentTask.effort, 'days').format('YYYY-MM-DD');
    } else {
      console.error(`Dependent task with ID ${dependentTaskId} not found`);
      task.start = moment('2024-09-01').format('YYYY-MM-DD');
    }
    
    // End date is start + effort - 1 days
    task.end = moment(task.start).add(task.effort - 1, 'days').format('YYYY-MM-DD');
  };

  // Recalculate dates for each task
  tasks.forEach(calculateDates);

  // Update state with the newly calculated dates
  setTasks([...tasks]);
};

   
  

  const handleSaveTask = (task) => {
    let updatedTasks;
    if (task.id) {
      updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
    } else {
      task.id = tasks.length + 1;
      updatedTasks = [...tasks, task];
    }

    adjustTaskDates(updatedTasks);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleAddTask = () => {
    setEditingTask({ name: '', effort: 1, start: '', end: '', dependentOnTaskId: null });
  };

  return (
    <div className="app-container">
      <h1>Task Grid</h1>
      <TaskGrid tasks={tasks} onEditTask={handleEditTask} />
      <button onClick={handleAddTask}>Add Task</button>
      {editingTask && (
        <TaskEditor
          task={editingTask}
          tasks={tasks}
          onSave={handleSaveTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default App;
