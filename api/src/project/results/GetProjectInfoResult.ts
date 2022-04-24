import { Result } from '../../Result';
import { ProjectInfo, SpineProjectInfo } from '../models/ProjectInfo';

export class GetProjectInfoResult extends Result<SpineProjectInfo, ProjectInfo> {
  getResultClass(): { new (originalValue: SpineProjectInfo): ProjectInfo } {
    return ProjectInfo;
  }
}
