import Tasks from "./Tasks";
import React from "react";

function SelectedProject({
  project,
  handleDelete,
  onAddTask,
  onDeleteTask,
  tasks,
}) {
  const formatedDate = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-2 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button
            onClick={handleDelete}
            className="text-stone-600 hover:text-stone-950"
          >
            Delete
          </button>
        </div>
        <p className="textstone-600 whitespace-pre-wrap">
          {project.description}
        </p>
        <p className="mb-4 text-stone-400">{formatedDate}</p>
      </header>
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
}

export default SelectedProject;
