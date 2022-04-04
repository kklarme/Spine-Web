import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ProjectInfo, SpineApi } from 'spine-api';
import { ServerProjectInfoProp, ServerPropConverter } from '../../ServerPropConverter';
import api from '../../api';

export interface ProjectPageProps {
  projectInfo: ServerProjectInfoProp;
}

const ProjectPage: NextPage<ProjectPageProps> = (props) => {
  return (
    <div className="flex flex-col min-h-0 flex-grow">
      <Head>
        <title>Spine Web - {props.projectInfo.name}</title>
      </Head>

      <main className="px-6 py-3 h-full">{JSON.stringify(props.projectInfo, undefined, 2)}</main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ProjectPageProps, { id: string }> = async (
  context,
) => {
  const projectInfo = await api.getProjectInfo(context.params?.id || '');
  const projectInfoProp = ServerPropConverter.toServerProp(projectInfo);
  return {
    props: {
      projectInfo: projectInfoProp,
    },
  };
};

export default ProjectPage;
