// src/components/TaskGrid.js
import React from 'react';
import moment from 'moment';

const TaskGrid = ({ tasks, onEditTask }) => {
  const gridStartDate = moment('2024-09-01'); // Adjust start date
  const gridEndDate = moment('2024-09-30'); // Adjust end date
  const totalDays = gridEndDate.diff(gridStartDate, 'days') + 1;

  const getDependentTaskName = (taskId) => {
    const dependentTask = tasks.find(t => String(t.id) === taskId);
    return dependentTask ? dependentTask.name : '';
  };

  const renderGridHeader = () => {
    const days = Array.from({ length: totalDays }, (_, i) => gridStartDate.clone().add(i, 'days').format('DD'));
    return (
      <div className="grid-header">
        <div className="grid-row">
          <div className="grid-cell header-cell">Task</div>
          <div className="grid-cell header-cell">Depends on</div>
          {days.map((day, i) => (
            <div key={i} className="grid-cell header-cell">
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTaskRow = (task) => {
    const taskStart = moment(task.start);
    const taskEnd = moment(task.end);
    const startDayOffset = taskStart.diff(gridStartDate, 'days');
    const endDayOffset = taskEnd.diff(gridStartDate, 'days');

    return (
      <div className="grid-row" key={task.id}>
        {/* Task Name - Make Clickable */}
        <div className="grid-cell task-name-cell" onClick={() => onEditTask(task)}>
          {task.name}
        </div>
        {/* Dependent Task */}
        <div className="grid-cell dependent-task-cell">
          {getDependentTaskName(task.dependentOnTaskId)}
        </div>
        {Array.from({ length: totalDays }).map((_, i) => (
          <div key={i} className="grid-cell">
            {i >= startDayOffset && i <= endDayOffset ? (
              <div className="task-bar"></div>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="task-grid">
      {renderGridHeader()}
      {tasks.map((task) => renderTaskRow(task))}
    </div>
  );
};

export default TaskGrid;
