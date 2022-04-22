import { Language } from '../../language';
import { GetProjectsDto } from './GetProjectsDto';

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
