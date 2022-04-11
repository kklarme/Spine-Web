import { parseSpineDate, unescapeHtml } from './utilities';
import { Package, RawPackage } from './Package';
import { Language, SpineLanguage } from './SpineLanguage';
import { GameType } from './GameType';
import { ModType } from './ModType';

export interface RawProject {
  ProjectID: string;
  Name: string;
  GameType: string;
  ModType: string;
  Keywords: string; // semicolon (;) delimited string, always ends with delimiter
  SupportedLanguages: string; // ? | probably there is a language entry in the database for every possible language combination
  TeamID: string;
  TeamName?: string;
  ReleaseDate: string; // hours till now
  MajorVersion: string;
  MinorVersion: string;
  PatchVersion: string;
  SpineVersion: string;
  DevDuration: string; // in minutes
  AvgDuration: string; // in minutes
  DownloadSize: string;
  UpdateDate: string; // hours till now
  Language: string; // ? | look at SupportedLanguages
}

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
  version: string;
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
    this.version = `${project.MajorVersion}.${project.MinorVersion}.${project.PatchVersion}`;
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
