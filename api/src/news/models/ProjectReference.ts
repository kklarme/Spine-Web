import { unescapeHtml } from '../../utilities';

export interface SpineProjectReference {
  ProjectID: string;
  Name: string;
}

export class ProjectReference {
  id: number;
  name: string;

  constructor(projectReference: SpineProjectReference) {
    this.id = parseInt(projectReference.ProjectID);
    this.name = unescapeHtml(projectReference.Name);
  }
}
