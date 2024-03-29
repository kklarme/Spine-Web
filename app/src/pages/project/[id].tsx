import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useMemo } from 'react';
import { Language, ProjectInfo, SpineApi } from 'spine-api';
import { modelFromServerSideProp, ServerSideProp, modelToServerSideProp } from '../../utilities';

export interface ProjectPageProps {
  projectId: number;
  projectInfo: ServerSideProp<ProjectInfo>;
}

const ProjectPage: NextPage<ProjectPageProps> = (props) => {
  const projectInfo = useMemo<ProjectInfo>(
    () => modelFromServerSideProp(props.projectInfo),
    [props.projectInfo],
  );

  return (
    <div className="flex flex-col min-h-0 flex-grow overflow-auto">
      <Head>
        <title>Spine Web - {projectInfo.name}</title>
      </Head>

      <main className="px-6 py-3 h-full">
        <div className="flex overflow-auto">
          {props.projectInfo.screenshots.map((screenshot, index) => (
            <img
              className="flex-1"
              key={index}
              src={`/api/images/mods/${props.projectId}/screens/${screenshot.file}`}
            />
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
  const projectInfoResult = await SpineApi.getProjectInfo(projectId, {
    language: context.locale as Language,
  });
  return {
    props: {
      projectId: +projectId,
      projectInfo: modelToServerSideProp(projectInfoResult.value),
    },
  };
};

export default ProjectPage;
