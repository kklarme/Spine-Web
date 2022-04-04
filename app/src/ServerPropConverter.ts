import { Language, Project, ProjectInfo } from 'spine-api';
import { Jsonify } from 'type-fest';

export type ServerProjectProp = Jsonify<Project>;
export type ServerProjectInfoProp = Jsonify<ProjectInfo>;

export class ServerPropConverter {
  static toServerProp<DATA>(data: DATA): Jsonify<DATA> {
    // TODO determine if this causes any performance issues and if it does, refactor
    return JSON.parse(JSON.stringify(data));
  }

  static toProject(projectProp: ServerProjectProp): Project {
    return {
      ...projectProp,
      updateDate: new Date(projectProp.updateDate),
      releaseDate: new Date(projectProp.releaseDate),
      language: projectProp.language as Language,
      supportedLanguages: projectProp.supportedLanguages as Language[],
    };
  }

  static toProjectInfo(projectInfoProp: ServerProjectInfoProp): ProjectInfo {
    return {
      ...projectInfoProp,
      updateDate: new Date(projectInfoProp.updateDate),
      releaseDate: new Date(projectInfoProp.releaseDate),
    };
  }
}
