import React, { useEffect, useState } from 'react';
import DefaultLayout from './layout/DefaultLayout';
import { Project } from 'spine-api';
import ProjectTable from './components/ProjectTable';
import testData from './test.json';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const projects: Project[] = testData.map((project: any) => {
      project.releaseDate = new Date(project.releaseDate);
      project.updateDate = new Date(project.updateDate);
      return project;
    });
    setProjects(projects);

    // SpineApi.getProjects({
    //   serverUrl: `${process.env.REACT_APP_SERVER_URL || ''}/spine`,
    //   credentials: {
    //     username: process.env.REACT_APP_SPINE_USERNAME || '',
    //     password: process.env.REACT_APP_SPINE_PASSWORD || '',
    //   },
    // }).then((loadedProjects) => {
    //   console.log('loaded', loadedProjects);
    //   setProjects(loadedProjects);
    // });
  }, []);

  return (
    <DefaultLayout>
      <div>
        <ProjectTable projects={projects} />
      </div>
    </DefaultLayout>
  );
};

export default App;
