import { unescapeHtml } from '../utilities';

export interface SpinePackage {
  PackageID: string;
  ProjectID: string;
  Name: string;
  Language: string;
}

export class Package {
  id: number;
  projectId: number;
  name: string;
  language: string;

  constructor(pkg: SpinePackage) {
    this.id = parseInt(pkg.PackageID);
    this.projectId = parseInt(pkg.ProjectID);
    this.name = unescapeHtml(pkg.Name);
    this.language = pkg.Language;
  }
}
