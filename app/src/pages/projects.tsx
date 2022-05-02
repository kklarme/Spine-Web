import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Project } from 'spine-api';
import { useEffect, useState } from 'react';
import LoadOverlay from '../components/LoadOverlay';
import { useSpineApi } from '../hooks/spine-api';

// Render project table only on client because we need window and document for correct dimension calculation
const DynamicProjectTableWithoutSSR = dynamic(
  () => import('../components/project-table/ProjectTable'),
  {
    ssr: false,
  },
);

const ProjectsPage: NextPage = () => {
  const spineApi = useSpineApi();
  const [isLoading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setLoading(true);
    spineApi
      .getProjects()
      .then((result) => {
        setProjects(result.value);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [spineApi]);

  return (
    <div className="flex flex-col min-h-0 flex-grow">
      <Head>
        <title>Spine Web - Projects</title>
      </Head>

      <main className="h-full">
        {isLoading && <LoadOverlay />}
        <DynamicProjectTableWithoutSSR projects={projects} />
      </main>
    </div>
  );
};

export default ProjectsPage;
