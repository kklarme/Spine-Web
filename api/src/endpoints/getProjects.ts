import { Language, LANGUAGE_NAME_MAP } from '../language';
import { Project, SpinePackage, SpinePlayedProject, SpineProject } from '../models';
import { Result } from '../result';

export class GetProjectsDto {
  Username: string | null;
  Password: string | null;
  Language: string;

  constructor(username: string | null, password: string | null, language: Language) {
    this.Username = username;
    this.Password = password;
    this.Language = LANGUAGE_NAME_MAP[language];
  }
}

export interface GetProjectsResponse {
  Projects: SpineProject[];
  PlayedProjects?: SpinePlayedProject[];
  Packages: SpinePackage[];
}

export class GetProjectsResult extends Result<GetProjectsResponse, Project[]> {
  protected convertValue(response: GetProjectsResponse): Project[] {
    return response.Projects.map(
      (project) =>
        new Project(
          project,
          response.Packages.filter((pkg) => pkg.ProjectID === project.ProjectID),
          response.PlayedProjects?.some((playedProject) => project.ProjectID === playedProject.ID),
        ),
    );
  }
}
