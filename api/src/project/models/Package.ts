import { unescapeHtml } from '../../utilities';

export interface RawPackage {
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

  constructor(pkg: RawPackage) {
    this.id = parseInt(pkg.PackageID);
    this.projectId = parseInt(pkg.ProjectID);
    this.name = unescapeHtml(pkg.Name);
    this.language = pkg.Language;
  }
}
