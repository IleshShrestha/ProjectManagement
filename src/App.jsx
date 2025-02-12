import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjSelected.jsx";
import SideBar from "./components/Sidebar.jsx";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined, // undefined: neither adding nor have one selected, null: adding, id: project is selected
    projects: [],
  });

  function handleClickAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
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

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  let currentProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = <SelectedProject project={currentProject} />;

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
      />
      {content}
    </main>
  );
}

export default App;
