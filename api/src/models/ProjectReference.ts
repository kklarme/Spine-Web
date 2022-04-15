import { unescapeHtml } from '../utilities';

export interface RawProjectReference {
  ProjectID: string;
  Name: string;
}

export class ProjectReference {
  id: number;
  name: string;

  constructor(projectReference: RawProjectReference) {
    this.id = parseInt(projectReference.ProjectID);
    this.name = unescapeHtml(projectReference.Name);
  }
}
