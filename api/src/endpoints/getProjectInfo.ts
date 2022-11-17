import { Language } from '../language';
import { Result } from '../result';
import { ProjectInfo, SpineProjectInfo } from '../models';
import { GetProjectsDto } from './getProjects';

export class GetProjectInfoDto extends GetProjectsDto {
  ProjectID: string | number;

  constructor(
    id: string | number,
    username: string | null,
    password: string | null,
    language: Language,
  ) {
    super(username, password, language);
    this.ProjectID = id;
  }
}

export class GetProjectInfoResult extends Result<SpineProjectInfo, ProjectInfo> {
  getResultClass(): { new (originalValue: SpineProjectInfo): ProjectInfo } {
    return ProjectInfo;
  }
}
