import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ServerProjectInfoProp, ServerPropConverter } from '../../ServerPropConverter';
import { useMemo } from 'react';
import testProjectInfo from '../../testData/projectInfo.json';

export interface ProjectPageProps {
  projectId: number;
  projectInfo: ServerProjectInfoProp;
}

const ProjectPage: NextPage<ProjectPageProps> = (props) => {
  const projectInfo = useMemo(
    () => ServerPropConverter.toProjectInfo(props.projectInfo),
    [props.projectInfo],
  );

  return (
    <div className="flex flex-col min-h-0 flex-grow">
      <Head>
        <title>Spine Web - {projectInfo.name}</title>
      </Head>

      <main className="px-6 py-3 h-full">
        <div className="flex overflow-auto">
          {props.projectInfo.screenshots.map((screenshot, index) => (
            <img className="flex-1" key={index} src={`/api/screenshots/${props.projectId}/${screenshot.file}`} />
          ))}
        </div>

        <div>
          {projectInfo.screenshots.map((screenshot) => (
            <div key={screenshot.file}></div>
          ))}
        </div>
        <div>{projectInfo.name}</div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ProjectPageProps, { id: string }> = async (
  context,
) => {
  const projectId = context.params?.id || '';
  // const projectInfo = await api.getProjectInfo(projectId);
  // const projectInfoProp = ServerPropConverter.toServerProp(projectInfo);
  const projectInfoProp = testProjectInfo as ServerProjectInfoProp;
  return {
    props: {
      projectId: +projectId,
      projectInfo: projectInfoProp,
    },
  };
};

export default ProjectPage;
