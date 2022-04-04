import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import testData from '../testData.json';
import dynamic from 'next/dynamic';
import { ServerProjectProp, ServerPropConverter } from '../ServerPropConverter';
import api from '../api';

export interface ProjectsPageProps {
  projects: ServerProjectProp[];
}

// Render project table only on client because we need window and document for correct dimension calculation
const DynamicProjectListWithoutSSR = dynamic(() => import('../components/ProjectTable'), {
  ssr: false,
});

const ProjectsPage: NextPage<ProjectsPageProps> = (props) => {
  const projects = props.projects.map(ServerPropConverter.toProject);
  return (
    <div className="flex flex-col min-h-0 flex-grow">
      <Head>
        <title>Spine Web - Projects</title>
      </Head>

      <main className="px-6 py-3 h-full">
        <DynamicProjectListWithoutSSR projects={projects} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ProjectsPageProps> = async (context) => {
  // const projects = await api.getProjects();
  // const projectProps = projects.map(ServerPropConverter.toServerProp);
  const projectProps = testData as ServerProjectProp[];
  return {
    props: {
      projects: projectProps,
    },
  };
};

export default ProjectsPage;
