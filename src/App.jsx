import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjSelected.jsx";
import SideBar from "./components/Sidebar.jsx";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined, // undefined: neither adding nor have one selected, null: adding, id: project is selected
    projects: [],
    tasks: [],
  });

  function handleClickAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddTask(taskText) {
    setProjectState((prevState) => {
      const newTask = {
        text: taskText,
        projectId: prevState.selectedProjectId,
        id: projectState.tasks.length + 1,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(project) {
    setProjectState((prevState) => {
      const newProject = {
        ...project,
        id: projectState.projects.length + 1,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }
  // updating the current project to either selected one or to undefined/null
  let currentProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );
  console.log(currentProject);
  let content = (
    <SelectedProject
      project={currentProject}
      handleDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onClickAddProject={handleClickAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onClickAddProject={handleClickAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
