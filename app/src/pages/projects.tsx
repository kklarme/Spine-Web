import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Language, Project, SpineApi } from 'spine-api';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SERVER_URL } from '../constants';
import LoadOverlay from '../components/LoadOverlay';

// Render project table only on client because we need window and document for correct dimension calculation
const DynamicProjectListWithoutSSR = dynamic(
  () => import('../components/project-table/ProjectTable'),
  {
    ssr: false,
  },
);

const ProjectsPage: NextPage = () => {
  const { i18n } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setLoading(true);
    SpineApi.getProjects({
      serverUrl: SERVER_URL,
      language: i18n.language as Language,
    })
      .then((getProjectsResult) => {
        setProjects(getProjectsResult.value);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [i18n.language]);

  return (
    <div className="flex flex-col min-h-0 flex-grow">
      <Head>
        <title>Spine Web - Projects</title>
      </Head>

      <main className="h-full">
        {isLoading && <LoadOverlay />}
        <DynamicProjectListWithoutSSR projects={projects} />
      </main>
    </div>
  );
};

export default ProjectsPage;
