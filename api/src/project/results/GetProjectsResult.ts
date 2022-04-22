import { GetProjectsResponse } from '../responses/GetProjectsResponse';
import { Project } from '../models/Project';
import { Result } from '../../Result';

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
