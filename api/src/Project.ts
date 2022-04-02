import { GameType, ModType, RawPackage, RawProject } from './types';
import { parseSpineDate, unescapeHtml } from './utilities';
import { Package } from './Package';
import { Language, SpineLanguage } from './SpineLanguage';

export class Project {
  id: number;
  name: string;
  gameType: GameType;
  modType: ModType;
  keywords: string[];
  supportedLanguages: Language[];
  teamId: number;
  teamName?: string;
  releaseDate: Date;
  majorVersion: number;
  minorVersion: number;
  patchVersion: number;
  spineVersion: number;
  devDuration: number;
  avgDuration: number;
  downloadSize: number;
  updateDate: Date;
  language: Language;
  packages: Package[];

  constructor(project: RawProject, packages: Array<RawPackage | Package> = []) {
    this.id = parseInt(project.ProjectID);
    this.name = unescapeHtml(project.Name);
    this.gameType = parseInt(project.GameType);
    this.modType = parseInt(project.ModType);
    const keywords = project.Keywords.split(';');
    // omit last item because it always ends with a semicolon
    this.keywords = keywords.slice(0, keywords.length - 1).map((keyword) => {
      return keyword.replace(/&apos/g, "'");
    });
    this.supportedLanguages = SpineLanguage.languageMap[parseInt(project.SupportedLanguages)];
    this.teamId = parseInt(project.TeamID);
    this.teamName = project.TeamName ? unescapeHtml(project.TeamName) : undefined;
    this.releaseDate = parseSpineDate(project.ReleaseDate);
    this.majorVersion = parseInt(project.MajorVersion);
    this.minorVersion = parseInt(project.MinorVersion);
    this.patchVersion = parseInt(project.PatchVersion);
    this.spineVersion = parseInt(project.SpineVersion);
    this.devDuration = parseInt(project.DevDuration);
    this.avgDuration = parseInt(project.AvgDuration);
    this.downloadSize = parseInt(project.DownloadSize);
    this.updateDate = parseSpineDate(project.UpdateDate);
    this.language = SpineLanguage.languageMap[parseInt(project.Language)][0];
    this.packages = packages.map((pkg) => {
      if (pkg instanceof Package) {
        return pkg;
      }
      return new Package(pkg);
    });
  }
}
