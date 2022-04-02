import { RawPackage } from './types';
import { unescapeHtml } from './utilities';

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
