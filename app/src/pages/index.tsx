import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Project } from 'spine-api';
import testData from '../testData.json';
import dynamic from 'next/dynamic';

export interface ProjectsPageProps {
  projects: Project[];
}

// Render project table only on client because we need window and document for correct dimension calculation
const DynamicProjectListWithoutSSR = dynamic(() => import('../components/ProjectTable'), {
  ssr: false,
});

const Projects: NextPage<ProjectsPageProps> = (props) => {
  return (
    <div>
      <Head>
        <title>Spine Web</title>
        <meta name="description" content="Unofficial web client for Spine" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#871313" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#871313" />
      </Head>

      <main className="px-6 py-3">
        <DynamicProjectListWithoutSSR projects={props.projects} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const projects = await SpineApi.getProjects({
  //   serverUrl: process.env.SERVER_URL || '',
  //   credentials: {
  //     username: process.env.SERVER_USERNAME || '',
  //     password: process.env.SERVER_PASSWORD || '',
  //   },
  // });
  const projects = testData.slice();
  return {
    props: {
      projects,
    },
  };
};

export default Projects;
